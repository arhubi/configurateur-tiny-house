import axios from "axios";
import { ItemProps } from "../atoms/Item";
import {isValidUrl} from "./index";

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
        name: item?.properties?.Nom?.title?.[0]?.plain_text,
        category: categoryName,
        price: item?.properties?.Prix?.number,
        image: isValidUrl(item?.properties?.Images?.files?.[0]?.name)
            ? item?.properties?.Images?.files?.[0]?.name
            :'https://static.thenounproject.com/png/220984-200.png'
    })).filter((item: any) => item.price && item.name && item.category)
}

export const getValidItems = (items: any[]): number => {
    return items.filter(item => {
        const name = item?.properties?.Nom?.title?.[0]?.plain_text
        const price = item?.properties?.Prix?.number
        return name && price
    }).length
}
