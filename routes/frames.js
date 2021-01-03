const express = require('express');
const { render } = require('pug');
const router = express.Router();

const {getFrames,getFrameById,addFrame,updateFrame,deleteFrame} = require('../controllers/framesController');
router.get('/', async (req, res)=>{

    try{
        const result = await getFrames();
        console.log("il risultato è: ",result);
        //res.json(result);

       res.render('datatable',{
           title:'Home Page',
           array:['zero', 'uno', 'due'],
           frames : result

      });
    } catch (e) {
        res.status(500).send(e.toString());
    }

})

router.get('/:frame_id([0-9]+)/stats', (req,res)=>{
     res.render('partials/chart')
})

router.get('/newFrame', (req,res)=>{
     res.render('partials/newFormFrame')
})

router.get('/:frame_id([0-9]+)/edit', async (req, res)=>{
    try{
        const frameId = req.params.frame_id;
        const frameObj = await getFrameById(frameId);
        const values = frameObj

        console.log("dati frame",values);
        //res.json(values)
        res.render('edit',{
            dataFrames : {values}
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.post('/', async (req, res)=>{

    console.log("body della richiesta",req.body);
      
    try{
        const result = await addFrame(req.body);
        res.redirect('/');
    }catch (e) {
        res.status(500).send(e.toString());
    }

})

router.delete('/:id([0-9]+)', async (req, res)=>{
    try {
        const deleted = await deleteFrame(req.params.id);
        res.status(deleted ? 200 : 404).redirect('/');;
    }catch (e) {
        res.status(500).send(e.toString());
    }
});

router.patch('/:id([0-9]+)', async (req, res)=>{
    console.log("body della richiesta",req.body);
   try {
       const upFrame =await updateFrame(req.params.id, req.body);
       res.status(upFrame ? 200: 404).redirect('/');
   }catch (e) {
       res.status(500).send(e.toString());
   }

});


module.exports = router;