let fighters = require('./seed-db.json');
let fighterID = fighters.length + 1;

//function objects
module.exports = {
    getFighter: (req, res) => {
        res.status(200).send(fighters)
    },
    deleteFighter: (req, res) => {
        let index = fighters.findIndex(elem => elem.id === +req.params.id);
        fighters.splice(index, 1);
        res.status(200).send(fighters)
    },
    createFighter: (req, res) => {
        const {name, level, imageURL} = req.body
        let newFighter = {
            id: fighterID,
            name,
            level: +level,
            imageURL
         }
         fighters.push(newFighter)
         fighterID++
         res.status(200).send(fighters)
    },
    updateFighter: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = fighters.findIndex(elem => +elem.id === +id);
        console.log(type);
        if(type === 'minus' && fighters[index].level > 0){
            fighters[index].level -= 1;
            res.status(200).send(fighters);
        } else if(type === 'plus' && fighters[index].level < 100){
            fighters[index].level += 1;
            res.status(200).send(fighters);
        } else {
            res.status(400).send('Something went wrong...')
        }
    }
}