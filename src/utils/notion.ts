import axios from 'axios'
import { ItemProps } from '../atoms/Item'
import { isValidUrl } from './index'

const propsMapping = {
    name: 'Nom',
    price: 'Prix',
    image: 'Images'
}

export const mapSettingsResults = (settings: any) => ({
    title: settings?.properties?.section?.title[0].plain_text,
    required: settings?.properties?.requis?.checkbox,
    multiple: settings?.properties?.choix_multiples?.checkbox,
    filterableFields: settings?.properties?.champs_filtrables?.multi_select
})

export const getDbItems = async (categoryName: string, notionDbId: string): Promise<ItemProps[]> => {
    const { data } = await axios.post(`/databases/${notionDbId}/query`) as any

    return data.results
        .map((item: any) => ({
        name: item?.properties?.[propsMapping.name]?.title?.[0]?.plain_text,
        category: categoryName,
        price: item?.properties?.[propsMapping.price]?.number,
        image: isValidUrl(item?.properties?.[propsMapping.image]?.files?.[0]?.name) && item?.properties?.Images?.files?.[0]?.name,
        details: getDetails(item, item?.properties)
    })).filter((item: any) => item.price && item.name && item.category)
}

export const getValidItems = (items: any[]): number => {
    return items.filter(item => {
        const name = item?.properties?.[propsMapping.name]?.title?.[0]?.plain_text
        const price = item?.properties?.[propsMapping.price]?.number
        return name && price
    }).length
}

const getDetails = (item: any, properties: any[]) => {
    const details = Object.keys(properties).filter(prop => !Object.values(propsMapping).includes(prop))
    return details.map(detail => ({
        name: detail,
        value: item?.properties?.[detail]?.rich_text?.[0]?.plain_text || 'N/A'
    }))
}
