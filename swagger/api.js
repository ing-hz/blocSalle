//////////////blocs//////////////
/**
 * @swagger
 * tags:
 *   name:Blocs
 *   description:blocs api
 */
/**
 * @swagger
 * tags:
 *   name:Salles
 *   description:salles api
 */
/**
 * @swagger
 * tags:
 *   name:Occupations
 *   description:occupations api
 */
/** 
 * @swagger 
 * /api/blocs: 
 *   get: 
 *     tags: [Blocs]
 *     description: Get all Blocs
 *     responses:  
 *       200: 
 *         description: Success  
 */  
/** 
 * @swagger 
 * /api/blocs: 
 *   post: 
 *     tags: [Blocs]
 *     description: Create a Bloc 
 *     responses:  
 *       201: 
 *         description: Created  
 *     parameters: 
 *     - nom: BlocName 
 *       description: Create an new bloc 
 *       in: body 
 *       required: true 
 *       type: String 
 */
/** 
 * @swagger 
 * /api/blocs/{id}: 
 *   delete: 
 *     tags: [Blocs]
 *     description: Create a Bloc
 *     responses:  
 *       201: 
 *         description: Deleted  
 *   
 */  
/** 
 * @swagger 
 * /api/blocs/{id}: 
 *   patch: 
 *     tags: [Blocs]
 *     description: update a Bloc
 *     responses:  
 *       201: 
 *         description: Updated  
 *   
 */  
//////////////salles//////////////  
/** 
 * @swagger 
 * /api/salles: 
 *   get: 
 *     tags: [Salles]
 *     description: Get all Salles
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  
/** 
 * @swagger 
 * /api/salles: 
 *   post: 
 *     tags: [Salles]
 *     description: Create a Salle 
 *     parameters: 
 *     - nom: BlocName 
 *       description: Create an new bloc 
 *       in: body 
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */
/** 
 * @swagger 
 * /api/salles/{id}: 
 *   delete: 
 *     tags: [Salles]
 *     description: Delete a Salle
 *     responses:  
 *       201: 
 *         description: Deleted  
 *   
 */  
/** 
 * @swagger 
 * /api/salles/{id}: 
 *   patch: 
 *     tags: [Salles]
 *     description: update a Salle
 *     responses:  
 *       201: 
 *         description: Updated  
 *   
 */  
//////////////occupations//////////////  
/** 
 * @swagger 
 * /api/occupations: 
 *   get: 
 *     tags: [Occupations]
 *     description: Get all Occupations
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  
/** 
 * @swagger 
 * /api/occupations: 
 *   post: 
 *     tags: [Occupations]
 *     description: Create an Occupation
 *     parameters: 
 *     - nom: BlocName 
 *       description: Create an new bloc 
 *       in: body 
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */
/** 
 * @swagger 
 * /api/occupations/{id}: 
 *   delete: 
 *     tags: [Occupations]
 *     description: Delete an Occupation
 *     responses:  
 *       201: 
 *         description: Deleted  
 *   
 */  
/** 
 * @swagger 
 * /api/occupations/{id}: 
 *   patch: 
 *     tags: [Occupations]
 *     description: update an Occupation
 *     responses:  
 *       201: 
 *         description: Updated  
 *   
 */  