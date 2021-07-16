
GITHUB_BASE_URL="https://github.com/Bahmni/bahmni-scripts/raw/master/demo/db-backups/v0.92"


OPENELIS_SQL_FILE="openelis_backup.sql"

OPENMRS_SQL_FILE="openmrs_backup.sql"

DEST_LOCATION="/home/centos/dbRestore"
OPENMRS_DB_NAME="openmrs"
OPENELIS_DB_NAME="clinlims"



setup(){
	rm -rf $DEST_LOCATION
	mkdir $DEST_LOCATION	
}

download_and_unzip(){
	wget -O $DEST_LOCATION/$OPENELIS_SQL_FILE.gz $GITHUB_BASE_URL/$OPENELIS_SQL_FILE.gz
	
	wget -O $DEST_LOCATION/$OPENMRS_SQL_FILE.gz $GITHUB_BASE_URL/$OPENMRS_SQL_FILE.gz
	


	gzip -d $DEST_LOCATION/$OPENELIS_SQL_FILE.gz $DEST_LOCATION/$ODOO_SQL_FILE.gz $DEST_LOCATION/$OPENMRS_SQL_FILE.gz $DEST_LOCATION/$BAHMNIPACS_SQL_FILE.gz $DEST_LOCATION/$PACSDB_SQL_FILE.gz
}

restore(){
	echo "Restoring the database"
	bahmni -i local stop
	mysql -u$SQLUSER -p$PASSWORD -e "drop database $OPENMRS_DB_NAME"
	mysql -u$SQLUSER -p$PASSWORD -e "create database $OPENMRS_DB_NAME"
	mysql -u$SQLUSER -p$PASSWORD $OPENMRS_DB_NAME < $DEST_LOCATION/$OPENMRS_SQL_FILE
	mysql -u$SQLUSER -p$PASSWORD -e "FLUSH PRIVILEGES"

	ps aux | grep -ie $OPENELIS_DB_NAME | awk '{print $2}' | xargs kill -9
	psql -U$PSQLUSER -c "drop database if exists $OPENELIS_DB_NAME;"
	psql -U$PSQLUSER -c "create database $OPENELIS_DB_NAME;"
	psql -U$CLINLIMSUSER $OPENELIS_DB_NAME < $DEST_LOCATION/$OPENELIS_SQL_FILE

	bahmni -i local start	
}

setup
download_and_unzip
restore
