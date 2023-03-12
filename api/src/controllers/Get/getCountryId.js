const { Router } = require('express');
const {Country, Activity} = require("../.././db");

const router = Router();

/* [ ] GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
 */
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  let searchId = await Country.findOne({
      where: {
          id: id
      },
      include:{
          model: Activity,
          attributes:['id', 'name', 'dificulted', 'duration', 'season'],
          through: { attributes: [] },
          
      },
      
  })
  if(!searchId) {
      res.status(404).send(`El '${id}' no se encuentra en ningun país`)
      } else {
      res.json(searchId)
      }

    })


    module.exports = router;
   
















  
/*   try {
    const {id} = req.params;
    let searchId = await Country.findOne({
      where: {
          id: id,
      },
      include:{
          model: Activity,
          attributes:['id', 'name', 'dificulted', 'duration', 'season',],
          through: { attributes: [] },

      }
    })
  return res.status(200).send(searchId)

  } catch (error) {
    return res.status(404).send("error", error.message)
    
  } */

