import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
	mutation AddProduct($productInput: ProductInput!) {
		addProduct(productInput: $productInput)
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($productId: String!, $productInput: ProductInput!) {
		updateProduct(productId: $productId, productInput: $productInput)
	}
`;

export const ADD_PRODUCT_VARIATIONS = gql`
	mutation AddProductVariations(
		$productVariations: [ProductVariationInput!]!
		$productId: String!
	) {
		addProductVariations(
			productVariations: $productVariations
			productId: $productId
		) {
			id
			inStock
			price
			colourId
			colour {
				id
				name
				hexValue
			}
		}
	}
`;

export const UPDATE_PRODUCT_VARIATION = gql`
	mutation UpdateProductVariation(
		$productVariationId: String!
		$productVariationInput: ProductVariationInput!
	) {
		updateProductVariation(
			productVariationId: $productVariationId
			productVariationInput: $productVariationInput
		)
	}
`;

export const ADD_PRODUCT_IMAGE = gql`
	mutation AddProductImage($productId: String!, $imagePublicId: String!) {
		addProductImage(productId: $productId, imagePublicId: $imagePublicId) {
			id
			productId
			publicId
		}
	}
`;

export const DELETE_PRODUCT_IMAGE = gql`
	mutation DeleteProductImage($productId: String!, $productImageId: String!) {
		deleteProductImage(
			productId: $productId
			productImageId: $productImageId
		)
	}
`;
