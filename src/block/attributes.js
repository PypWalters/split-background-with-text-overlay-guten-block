const attributes = {
	blockAlignment: {
		type: 'string',
	},
	overlayAlign: {
		type: 'string',
	},
	overlayCopy: {
		type: 'array',
		source: 'children',
		selector: '.overlay',
	},
	overlayTextColor: {
		type: 'string',
		default: '#ffffff',
	},
	overlayFontSize: {
		type: 'number',
		default: 14,
	},
	leftBgView: {
		type: 'string',
		default: 'color',
	},
	rightBgView: {
		type: 'string',
		default: 'color',
	},
	leftBgColor: {
		type: 'string',
		default: '#0A68A8',
	},
	rightBgColor: {
		type: 'string',
		default: '#0A94A8',
	},
	leftDisplayBg: {
		type: 'string',
		default: 'none',
	},
	rightDisplayBackground: {
		type: 'string',
		default: 'none',
	},
	leftImgID: {
		type: 'number',
	},
	leftImgURL: {
		type: 'string',
	},
	leftImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
	},
	leftOpacity: {
		type: 'number',
		default: 25,
	},
	rightImgID: {
		type: 'number',
	},
	rightImgURL: {
		type: 'string',
	},
	rightImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
	},
	rightOpacity: {
		type: 'number',
		default: 25,
	},
};

export default attributes;
