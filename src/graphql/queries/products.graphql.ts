import { gql } from "@apollo/client";

export const GET_CATEGORY_PRODUCTS_FOR_BUYERS = gql`
	query GetCategoryProductsForBuyers($categoryId: Int!) {
		getCategoryProductsForBuyers(categoryId: $categoryId) {
			id
			name
			description
			clothComposition
			width
			gsm
			pattern
			maxOrderSize
			minOrderSize
			variations {
				id
				price
				inStock
				colourHexCode
				finalPrice
			}
			productImages {
				id
				productId
				publicId
			}
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
	query GetProductDetails($productId: String!) {
		getProductDetails(productId: $productId) {
			id
			name
			description
			clothComposition
			width
			gsm
			pattern
			maxOrderSize
			minOrderSize
			referenceId
			variations {
				id
				price
				inStock
				colourHexCode
				finalPrice
			}
			productCategoryRelations {
				productId
				productCategoryId
				productCategory {
					name
					id
				}
			}
			productImages {
				id
				productId
				publicId
			}
		}
	}
`;
