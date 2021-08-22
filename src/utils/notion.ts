import axios from 'axios'
import { ItemProps } from '../components/molecules/Item'
import { StepProps } from '../components/molecules/Step'
import { isValidUrl } from './index'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import {  useEffect, useState } from 'react'

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

export const mapSuppliersResults = (supplier: any) => {
  return {
    id: supplier.id,
    name: supplier?.properties?.Nom?.title[0].plain_text,
    url: supplier?.properties?.Lien?.url
}}

export const useDbItems = (categoryName: string, notionDbId: string): ItemProps[] => {
  const [items, setItems] = useState<ItemProps[]>([])
  const [rawItems, setRawItems] = useState<any[]>([])

  useEffect(() => {
      (async () => {
        const items: any = await axios.post(`/databases/${notionDbId}/query`)
        setRawItems(items)
      })()
    },
    [notionDbId])

  const suppliers = useSelector((state: RootState) => state.suppliers)

  useEffect(() => {
    // @ts-ignore
    const { data } = rawItems
    if (!data?.results) return
    setItems(data.results.map((item: any) => {
        const properties = item?.properties
        if (!properties) return {}
        return {
          name: properties[propsMapping.name]?.title?.[0]?.plain_text,
          category: categoryName,
          price: properties[propsMapping.price]?.number,
          image: isValidUrl(properties[propsMapping.image]?.files?.[0]?.name) && item?.properties?.Images?.files?.[0]?.name,
          details: getDetails(item, properties),
          supplier: suppliers.find((supplier: any) => supplier.id === properties[propsMapping.supplier]?.relation?.[0]?.id),
          url: isValidUrl(properties[propsMapping.url]?.url)
            ? properties[propsMapping.url]?.url
            : ''
        }
      }).filter((item: any) => item.price && item.name && item.category) || [])
  }, [categoryName, rawItems, suppliers])

  return items
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
