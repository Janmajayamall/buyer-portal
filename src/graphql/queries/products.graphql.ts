import { gql } from "@apollo/client";

// export const GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS = gql`
// 	query GetProductsBySearchPhraseForBuyers($searchPhrase: String!) {
// 		getProductsBySearchPhraseForBuyers(searchPhrase: $searchPhrase) {
// 			id
// 			name
// 			description
// 			clothComposition
// 			width
// 			gsm
// 			pattern
// 			minOrderSize
// 			referenceId
// 			hsnCode
// 			taxPercentage
// 			variations {
// 				id
// 				price
// 				inStock
// 				colourHexCode
// 				rChannel
// 				gChannel
// 				bChannel
// 				timestamp
// 			}
// 			images {
// 				id
// 				productId
// 				publicId
// 				timestamp
// 			}
// 			tags
// 			timestamp
// 			usage
// 		}
// 	}
// `;

// export const GET_PRODUCT_DETAILS = gql`
// 	query GetProductDetails($productId: Int!) {
// 		getProductDetails(productId: $productId) {
// 			id
// 			name
// 			description
// 			clothComposition
// 			width
// 			gsm
// 			pattern
// 			minOrderSize
// 			referenceId
// 			hsnCode
// 			taxPercentage
// 			variations {
// 				id
// 				price
// 				inStock
// 				colourHexCode
// 				rChannel
// 				gChannel
// 				bChannel
// 				timestamp
// 			}
// 			images {
// 				id
// 				productId
// 				publicId
// 				timestamp
// 			}
// 			tags
// 			timestamp
// 			usage
// 		}
// 	}
// `;
