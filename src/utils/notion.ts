import axios from 'axios'
import { ItemProps } from '../components/molecules/Item'
import { StepProps } from '../components/molecules/Step'
import { isValidUrl } from './index'

const propsMapping = {
    name: 'Nom',
    price: 'Prix',
    image: 'Images',
    supplier: 'Fournisseur',
    url: 'Lien'
}

export const mapSettingsResults = (settings: any) => ({
    title: settings?.properties?.section?.title[0].plain_text,
    isRequired: settings?.properties?.requis?.checkbox,
    isMultiple: settings?.properties?.choix_multiples?.checkbox,
    filterableFields: settings?.properties?.champs_filtrables?.multi_select
})

export const getDbItems = async (categoryName: string, notionDbId: string): Promise<ItemProps[]> => {
    const { data } = await axios.post(`/databases/${notionDbId}/query`) as any

    return data.results
        .map((item: any) => {
            const properties = item?.properties
            if (!properties) return {}
            return {
                name: properties[propsMapping.name]?.title?.[0]?.plain_text,
                category: categoryName,
                price: properties[propsMapping.price]?.number,
                image: isValidUrl(properties[propsMapping.image]?.files?.[0]?.name) && item?.properties?.Images?.files?.[0]?.name,
                details: getDetails(item, properties),
                supplier: properties[propsMapping.supplier]?.relation?.[0]?.id,
                url: isValidUrl(properties[propsMapping.url]?.url)
                  ? properties[propsMapping.url]?.url
                  : ''
            }
        }).filter((item: any) => item.price && item.name && item.category)
}

export const countValidItems = (items: any[]): number => {
    return items.reduce((acc, item) => {
        const name = item?.properties?.[propsMapping.name]?.title?.[0]?.plain_text
        const price = item?.properties?.[propsMapping.price]?.number
        return name && price ? ++acc : acc
    }, 0)
}

const getDetails = (item: any, properties: any[]) => {
    const details = Object.keys(properties).filter(prop => !Object.values(propsMapping).includes(prop))
    return details.map(detail => ({
        name: detail,
        value: item?.properties?.[detail]?.rich_text?.[0]?.plain_text || 'N/A'
    }))
}

export const isStepActive = (steps: StepProps[], title: string) => {
    const matchingStep = steps.find(step => step.title === title)
    return matchingStep
      ? matchingStep.isActive
      : false
}

export const isStepEnabled = (steps: StepProps[], title: string) => {
    const matchingStep = steps.find(step => step.title === title)
    return matchingStep
      ? matchingStep.isEnabled
      : false
}

export const isStepValidated = (steps: StepProps[], title: string) => {
    const matchingStep = steps.find(step => step.title === title)
    return matchingStep
      ? matchingStep.isValidated
      : false
}
