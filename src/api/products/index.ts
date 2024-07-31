import supabase from '@/lib/supabase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProductList = ()=>{
	return useQuery({
		queryKey:['products'],
		queryFn: async ()=>{
			const {data, error} = await supabase.from('products').select('*')
			if(error){
				throw new Error(error.message)
			}
			return data
		},
	})
}
export const useProduct = (id: number)=>{
	return useQuery({
		queryKey: ['products', id],
		queryFn: async () => {
			const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
			if (error) {
				throw new Error(error.message)
			}
			return data
		},
	})
}
export const useInsertProduct = ()=>{
	const queryClinet = useQueryClient()
	return useMutation({
		async mutationFn(data: any) {
			console.log('mutation insert', data);
			
			const{error, data: newProduct} = await supabase
			.from('products')
			.insert({
				name: data.name,
				description: data.description,
				picture: data.image,
				price: data.price,
			})
			.single()
			if (error) {
				console.log('inser error', error);
				
				throw new Error(error.message)
			}
			return newProduct
		},
		async onSuccess() {
			await queryClinet.invalidateQueries({ queryKey:['products']})
		}
	})

}
export const useUpdateProduct = () => {
	const queryClinet = useQueryClient()
	return useMutation({
		async mutationFn(data: any) {
			const { error, data: newProduct } = await supabase
				.from('products')
				.update({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.eq('id',data.id)
				.select()
				.single()
			if (error) {
				throw new Error(error.message)
			}
			return newProduct
		},
		async onSuccess(_, data) {
			await queryClinet.invalidateQueries({ queryKey: ['products'] })
			await queryClinet.invalidateQueries({ queryKey: ['products', data.id] })
		}
	})

}

export const useDeleteProduct = () => {
	const queryClinet = useQueryClient()
	return useMutation({
		async mutationFn(id: number) {
			await supabase
				.from('products')
				.delete()
				.eq('id', id)
		},
		async onSuccess(_, id) {
			await queryClinet.invalidateQueries({ queryKey: ['products'] })
			await queryClinet.invalidateQueries({ queryKey: ['products', id] })
		}
	})

}