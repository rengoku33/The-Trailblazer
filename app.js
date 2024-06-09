const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the other side', app: 'The Trailblazer'});
// })

// app.post('/', (req, res) => {
//     res.send('send post req to this endpoint');
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'insertion into JSON complete',
            data: {
                tour: newTour
            }
        })
    })

});

// fetch a particular product with id --> url/:id 
// optional param --> url/:id?
// multiple param --> url/:id/:x/:y?
app.get('/api/v1/tours/:id', (req, res) => {

    console.log(req.params);
    // req.params stores the endpoints: id = 1, x=7, y=3
    const id = req.params.id * 1;
    // convert string --> number (just multiply with 1)

    const tour = tours.find(el => el.id === id);
    // find the JSON obj with id

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});



const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`)
    console.log('callback fn called right after the server runs')
}); 
