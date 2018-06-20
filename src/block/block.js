/**
 * BLOCK: split-bg-text-overlay
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Imports
import './style.scss';
import './editor.scss';
import classnames from 'classnames';
import attributes from './attributes';


const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	registerBlockType,
	className,
} = wp.blocks; // Import registerBlockType() from wp.blocks

const {
	AlignmentToolbar,
	BlockControls,
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	BlockAlignmentToolbar,
} = wp.editor;

const {
	PanelBody,
	RadioControl,
	Button,
	RangeControl,
} = wp.components;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'cgb/block-split-bg-text-overlay', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'split-bg-text-overlay - CGB Block' ), // Block title.
	icon: 'leftright', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'split-bg-text-overlay — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes, //see attributes.js

	getEditWrapperProps( { blockAlignment } ) {
		if ( 'center' === blockAlignment || 'wide' === blockAlignment || 'full' === blockAlignment ) {
			return { 'data-align': blockAlignment };
		}
	},

	edit: props => {
		const {
			attributes:
			{
				overlayAlign, overlayCopy, leftBgView, rightBgView, leftBgColor,
				rightBgColor, overlayTextColor, leftImgURL, leftImgID, leftImgAlt,
				rightImgURL, rightImgID, rightImgAlt, overlayFontSize, blockAlignment,
				leftOpacity, rightOpacity,
			},
			className,
			setAttributes,
		} = props;

		const onLeftSelectImage = img => {
			setAttributes( {
				leftImgID: img.id,
				leftImgURL: img.url,
				leftImgAlt: img.alt,
			} );
		};

		const onRightSelectImage = img => {
			setAttributes( {
				rightImgID: img.id,
				rightImgURL: img.url,
				rightImgAlt: img.alt,
			} );
		};

		const leftRemoveImage = () => {
			setAttributes( {
				leftImgID: null,
				leftImgURL: null,
				leftImgAlt: null,
			} );
		};

		const rightRemoveImage = () => {
			setAttributes( {
				rightImgID: null,
				rightImgURL: null,
				rightImgAlt: null,
			} );
		};

		return (
			<div className={ classnames(
				{ [ `overlay-${ overlayAlign }` ] : overlayAlign },
				className
			) }>

				<InspectorControls key="sidePannel">
					<PanelBody
						title={ __( 'Text Options' ) }
						initialOpen={ false }
					>
						<ColorPalette
							label={ __( 'Font Color' ) }
							value={ overlayTextColor }
							onChange={ overlayTextColor => setAttributes( { overlayTextColor } ) }
						/>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={ __( 'Font Size' ) }
							value={ overlayFontSize }
							onChange={ overlayFontSize => setAttributes( { overlayFontSize } ) }
							min={ 10 }
							max={ 60 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Left Background Options' ) }
						initialOpen={ false }
					>

						<RadioControl
							label={ __( 'Left Background' ) }
							selected={ leftBgView }
							options={ [
								{ label: __( 'Color' ), value: 'color' },
								{ label: __( 'Image' ), value: 'image' },
							] }
							onChange={ leftBgView => setAttributes( { leftBgView } ) }
						/>

						{ 'color' === leftBgView &&
						<div>
							<p><strong>Choose a background color:</strong></p>
							<ColorPalette
								value={ leftBgColor }
								onChange={ leftBgColor => setAttributes( { leftBgColor } ) }
							/>
						</div>
						}

						{ 'image' === leftBgView &&
							<div>
								<p><strong>Choose a background image:</strong></p>
								{ ! leftImgID ? (
									<MediaUpload
										onSelect={ onLeftSelectImage }
										type="image"
										value={ leftImgID }
										render={ ( { open } ) => (
											<Button
												className={ 'button button-large' }
												onClick={ open }
											>
												{ __( ' Upload Image' ) }
											</Button>
										) }
									>
									</MediaUpload>
								) :
									<div>
										<img alt={ leftImgAlt } src={ leftImgURL } /><br />
										<Button
											className={ 'button button-large' }
											onClick={ leftRemoveImage }
										>Remove Image</Button>
									</div>
								}

								<div>
									<RangeControl
										beforeIcon="arrow-left-alt2"
										afterIcon="arrow-right-alt2"
										label={ __( 'Background Dimness' ) }
										value={ leftOpacity }
										onChange={ leftOpacity => setAttributes( { leftOpacity } ) }
										min={ 0 }
										max={ 100 }
									/>
								</div>
							</div>
						}
					</PanelBody>

					<PanelBody
						title={ __( 'Right Background Options' ) }
						initialOpen={ false }
					>

						<RadioControl
							label={ __( 'Right Background' ) }
							selected={ rightBgView }
							options={ [
								{ label: __( 'Color' ), value: 'color' },
								{ label: __( 'Image' ), value: 'image' },
							] }
							onChange={ rightBgView => setAttributes( { rightBgView } ) }
						/>

						{ 'color' === rightBgView &&
						<div>
							<p><strong>Choose a background color:</strong></p>
							<ColorPalette
								value={ rightBgColor }
								onChange={ rightBgColor => setAttributes( { rightBgColor } ) }
							/>
						</div>
						}

						{ 'image' === rightBgView &&
						<div>
							<p><strong>Choose a background image:</strong></p>
							{ ! rightImgID ? (
								<MediaUpload
									onSelect={ onRightSelectImage }
									type="image"
									value={ rightImgID }
									render={ ( { open } ) => (
										<Button
											className={ 'button button-large' }
											onClick={ open }
										>
											{ __( ' Upload Image' ) }
										</Button>
									) }
								>
								</MediaUpload>
							) :
								<div>
									<img alt={ rightImgAlt } src={ rightImgURL } /> <br />
									<Button
										className={ 'button button-large' }
										onClick={ rightRemoveImage }
									>Remove Image</Button>
								</div>
							}

							<div>
								<RangeControl
									beforeIcon="arrow-left-alt2"
									afterIcon="arrow-right-alt2"
									label={ __( 'Background Dimness' ) }
									value={ rightOpacity }
									onChange={ rightOpacity => setAttributes( { rightOpacity } ) }
									min={ 0 }
									max={ 100 }
								/>
							</div>
						</div>
						}
					</PanelBody>

				</InspectorControls>

				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<AlignmentToolbar
						value={ overlayAlign }
						onChange={ overlayAlign => setAttributes( { overlayAlign } ) }
					/>
				</BlockControls>

				<div className="bg-holder">
					<div
						data-url={ leftImgURL }
						className="left-bg"
						style={ backgroundStyles( leftImgURL, leftBgColor, leftBgView, leftOpacity ) }
					>
					</div>
					<div
						data-url={ rightImgURL }
						className="right-bg"
						style={ backgroundStyles( rightImgURL, rightBgColor, rightBgView, rightOpacity, ) }
					>
					</div>
				</div>
				<div className="overlay">
					<RichText
						tagName="div"
						onChange={ overlayCopy => setAttributes( { overlayCopy } ) }
						multiline="p"
						style={ {
							textAlign: overlayAlign,
							color: overlayTextColor,
							fontSize: `${ overlayFontSize }px`,
						} }
						value={ overlayCopy }
					/>
				</div>
			</div>
		);
	},

	save: props => {
		const {
			attributes: {
				overlayAlign, overlayTextColor, overlayCopy,
				overlayFontSize, leftBgColor, rightBgColor, leftImgURL, rightImgURL,
				leftBgView, rightBgView, blockAlignment, leftOpacity, rightOpacity,
			},
			className
		} = props;

		return (
			<div
				className={ classnames(
					{ [ `align${ blockAlignment }` ]: blockAlignment },
					{ [ `overlay-${ overlayAlign }` ]: overlayAlign },
					className,
				) }
			>

				<div className="bg-holder">
					<div
						className="left-bg"
						style={ backgroundStyles( leftImgURL, leftBgColor, leftBgView, leftOpacity )	}
					></div>
					<div
						className="right-bg"
						style={ backgroundStyles( rightImgURL, rightBgColor, rightBgView, rightOpacity ) }
					></div>
				</div>
				<div
					className="overlay"
					style={ {
						textAlign: overlayAlign,
						color: overlayTextColor,
						fontSize: `${ overlayFontSize }px`,
					} }>
					{ overlayCopy }
				</div>
			</div>
		);
	},
} );

// used to determine whether we want a bg color or image to display
function backgroundStyles( url, colorSelect, viewOption, opacitySelect ) {
	return 'image' === viewOption && url ?
		{
			backgroundImage: `url(${ url })`,
			opacity: ( ( 100 - parseInt( opacitySelect ) ) * 0.01 ),
		} :
		{ backgroundColor: colorSelect };
}
