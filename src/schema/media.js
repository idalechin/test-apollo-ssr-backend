import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		media(id: ID!): Media
	}

	type Images {
		thumbnail: Image
		normal: Image
		big: Image
	}

	type Image {
		src: String
		width: Int
		height: Int
	}

	type Media {
		id: ID!
		source: String
		vendors: [Vendor]
		images: Images
		wedding_id: Int
		isVideo: Int
		video_hashed_id: String
		video_thumbnail: String
		mosaic_media: Int
		owner_id: Int
	}
`;
