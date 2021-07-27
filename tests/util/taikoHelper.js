const { button, toRightOf, textBox, into, write, click, timeField,below,scrollTo,text,$, checkBox,waitFor,image,within } = require('taiko');
var date = require("./date");

async function repeatUntilNotFound(elementIdentifier){
    var isFound = false;
    do {
        isFound = await $(elementIdentifier).exists()
        waitFor(1000)
    }while (!isFound) 
}

async function executeConfigurations(configurations,observationFormName){
    for(var configuration of configurations){
        switch(configuration.type) {
            case 'Group':
                await executeConfigurations(configuration.value,observationFormName)
              break;
            case 'TextArea':
                if(configuration.proximity!=null&&configuration.proximity!="")
                {
                    switch(configuration.proximity){
                        case 'below':
                            await write(configuration.value,into(textBox(below(configuration.proximityLabel), toRightOf(configuration.label))))
                        break;
                        case 'above':
                            await write(configuration.value,into(textBox(below(configuration.proximityLabel), toRightOf(configuration.label))))
                        break;
                        default:
                                console.log("Unhandled "+configuration.label+":"+configuration.value)
                            break;
                    }
                }
                else
                    await write(configuration.value,into(textBox(toRightOf(configuration.label))))
              break;
            case 'TextBox':
                await write(configuration.value,into(textBox(toRightOf(configuration.label))))
            break;
          case 'Button':
              {
                await scrollTo(text(observationFormName,toRightOf("History and Examination")))
                await click(button(configuration.value),toRightOf(configuration.label))
            }
            break;      
            case 'Date':
                if(configuration.value=='Today')
                    await timeField({type:"date"},toRightOf(configuration.label)).select(date.today());
                else
                {
                    dateLessThan = configuration.value.split("-");
                    if(dateLessThan.length>1)
                    {
                        await timeField({type:"date"},toRightOf(configuration.label)).select(date.getDateAgo(dateLessThan[1]));
                    }
                }
            break;      
            default:
                console.log("Unhandled "+configuration.label+":"+configuration.value)
          }            
    }
}

module.exports={
    executeConfigurations:executeConfigurations,
    repeatUntilNotFound:repeatUntilNotFound
}