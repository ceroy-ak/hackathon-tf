import * as express from 'express'
import {
    saveTemplate,
    deleteTemplateById,
    fetchAllTemplates,
    fetchTemplateByAccountId,
    deleteAllTemplate
} from '../model'

export const templateRouter = express.Router()

templateRouter.post('/', async (req, res) => {
    try {
        const { template, accountId } = req.body
        if (!template) {
            throw new Error('Template is required')
        }
        const templateId = await saveTemplate(template, accountId)
        return res.send({ templateId })
    } catch (err) {
        const message = (err as Error)?.message || 'Something went wrong'
        return res.status(500).send(message)
    }
})

templateRouter.get('/:accountId?', async (req, res) => {
    try {
        const { accountId } = req.params
        let templates: object[]
        if (accountId) {
            templates = await fetchTemplateByAccountId(accountId)
        } else {
            templates = await fetchAllTemplates()
        }
        return res.send({ templates })
    } catch (err) {
        const message = (err as Error)?.message || 'Something went wrong'
        return res.status(500).send(message)
    }
})

templateRouter.delete('/:templateId', async (req, res) => {
    try {
        const { templateId } = req.params
        if (!templateId) {
            return res.status(400).send('Template Id is required')
        }
        const value = await deleteTemplateById(parseInt(templateId))
        if (value) {
            return res.send('OK')
        }
        return res.status(500).send('NOT OK')
    } catch (err) {
        const message = (err as Error)?.message || 'Something went wrong'
        return res.status(500).send(message)
    }
})

templateRouter.delete('/', async (req, res) => {
    try {
        await deleteAllTemplate()
        return res.send('OK')
    } catch (err) {
        const message = (err as Error)?.message || 'Something went wrong'
        return res.status(500).send(message)
    }
})