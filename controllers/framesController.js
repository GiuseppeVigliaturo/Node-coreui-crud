const { request } = require('express');
const pool = require('../db');

async function getFrames() {
   const [result,] = await pool.query('SELECT * FROM iframes');
   return result;
}

async function getFrameById(id) {
    const [result,] = await pool.query('SELECT * FROM iframes where id=?',[id]);
    return result[0];
}

async function addFrame({Nome,Dominio,Posterframe,Src}){
    const created_at = new Date();
    const [result] = await pool.query('INSERT INTO iframes (Nome,Dominio,Posterframe,Src,created_at) VALUES (?,?,?,?,?)',[[Nome],[Dominio],[Posterframe],[Src],[created_at]]);
    return {Nome,Dominio,Posterframe,Src};

}

async function updateFrame(id,{Nome,Dominio,Posterframe,Src}){
    console.log(id,Nome,Dominio,Posterframe,Src);
    const created_at = new Date();
    const [result,] = await pool.query('UPDATE iframes SET Nome=?,Dominio=?,Posterframe=?,Src=?,created_at=? WHERE id=?',[[Nome],[Dominio],[Posterframe],[Src],[created_at],[id]]);
    return {Nome,Dominio,Posterframe,Src,id}


}

async function deleteFrame( id) {
    const [result,] = await pool.query('DELETE FROM iframes where id=?',[id]);
    return result.affectedRows ;
}

module.exports = {
    getFrames,
    getFrameById,
    addFrame,
    updateFrame,
    deleteFrame

};