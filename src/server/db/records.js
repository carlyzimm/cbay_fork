const db = require('./client')



async function getAllRecords(){
    const {rows} = await db.query ('SELECT * FROM records')
    return rows
    
}







async function addNewRecord(record){
    const { artist, albumname, year, genre, imageurl, price } = record

    const {rows}  = await db.query(
        `INSERT INTO records (artist,albumname,year,genre,image_url,price) 
        VALUES ($1,$2,$3,$4,$5,$6) 
        RETURNING *;`,[artist, albumname, year, genre, imageurl, price]
    )
     return rows [0];
        
}



module.exports = {addNewRecord, getAllRecords}





