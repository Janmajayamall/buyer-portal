import { gql } from "@apollo/client";

export const GET_CATEGORY_PRODUCTS_FOR_BUYERS = gql`
	query GetCategoryProductsForBuyers($categoryName: String!) {
		getCategoryProductsForBuyers(categoryName: $categoryName) {
			id
			name
			description
			clothComposition
			width
			gsm
			pattern
			minOrderSize
			referenceId
			hsnCode
			taxPercentage
			variations {
				id
				price
				inStock
				colourHexCode
				rChannel
				gChannel
				bChannel
				timestamp
			}
			categories {
				category {
					id
					name
					timestamp
				}
			}
			images {
				id
				productId
				publicId
				timestamp
			}
			timestamp
		}
	}
`;

export const GET_PRODUCT_CATEGORIES = gql`
	query GetProductCategories {
		getProductCategories {
			id
			name
		}
	}
`;

export const GET_PRODUCT_DETAILS = gql`
	query GetProductDetails($productId: Int!) {
		getProductDetails(productId: $productId) {
			id
			name
			description
			clothComposition
			width
			gsm
			pattern
			minOrderSize
			referenceId
			hsnCode
			taxPercentage
			variations {
				id
				price
				inStock
				colourHexCode
				rChannel
				gChannel
				bChannel
				timestamp
			}
			categories {
				category {
					id
					name
					timestamp
				}
			}
			images {
				id
				productId
				publicId
				timestamp
			}
			timestamp
		}
	}
`;
