const baseQuery = require('./baseQuery');

class Categorias {

    listAll(){

        return baseQuery('Select * from categoria');

    }

    insert(categoria){

        return baseQuery('INSERT INTO categoria SET ?', categoria);

    }

    listById(id){

        return baseQuery('SELECT * FROM categoria WHERE id = ?', id);

    }

    update(categoria){

        return baseQuery('UPDATE categoria SET ? WHERE id = ?', [categoria, categoria.id]);

    }

    delete(id){

        return baseQuery('DELETE FROM categoria WHERE id = ?', id); 

    }

}

module.exports = Categorias;