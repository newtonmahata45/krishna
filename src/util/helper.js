function asd() {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let name = month[d.getMonth()]
    console.log(d)
    console.log(name)

}
const getInfo = {
    name: "Lithium",
    week: 'W3D5',
    topic: 'Todays Node js Topic -- How to create Module and Export it.',
}

function getBatchInfo() {
    console.log(`${getInfo.name} , ${getInfo.week} , ${getInfo.topic} `)
}

module.exports.myasd = asd;
module.exports.myinfo = getBatchInfo;