import {Router} from "express";
import {create, destroy, getById, list, update} from "../services/user-service";

const router = Router()

router.get('', list)
router.get('/:id', getById)
router.post('', create)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router
