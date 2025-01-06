import {Router} from "express";
import {
    create,
    destroy,
    getById,
    getRandomNow,
    getRandomSpecificTime,
    list,
    update
} from "../services/foodOption-service";

const router = Router()

router.get('', list)
router.get('/random-now', getRandomNow)
router.get('/random-specific-time', getRandomSpecificTime)
router.get('/:id', getById)
router.post('', create)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router