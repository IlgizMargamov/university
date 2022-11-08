// node .\vm.js factorial.txt 5
// node .\vm.js biggestCommonDivider.txt 15 25
// node .\vm.js -h function
// как работать, как включить, краткое описание
// ctrl+enter to run the code, ctrl+shift+enter to debug

obj = { a: 1, b: 2, c: 3}

keys = Object.keys(obj)

for (var i = 0, l = keys.length; i < l; i++) {
    console.log(keys[i] + ' is ' + obj[keys[i]]);
    // keys[i] - это ключ
    // obj[keys[i]] - а это свойство, доступное по этому ключу
}

Object.prototype.getKeyByValue = function(value, objs) {

    // защита от циклических ссылок
    if (!objs)
        objs = [];

    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] === value) {
                return prop;
            } else if (typeof this[prop] === "object" && objs.indexOf(this[prop]) == -1) {
                objs.push(this[prop]);
                var res = this[prop].getKeyByValue(value, objs);
                if (res)
                    return prop + "." + res; //за дополнительные баллы оценки - выведем цепочку названий ключей
            }
        }
    }
}

function fillInFunctions() {
        let funcs={}
        let j=250
        for (let i=0; i<tmpProg.length; i++){
            let command = tmpProg[i].split(" ")
            for (let k=0; k<tmpProg.length; k++){
                if (funcs[k]==command[0])
                    continue
                else funcs[j++]=command[0]
            }
        }
        return funcs;
}