import React from 'react';

// export interface CoverImageProp  {
//     herf: string;
//     imgSrc: string;
// }

export const CoverImage = (coverImageProp) => <div>
    <img src={coverImageProp.imgSrc}/>
    <a href={coverImageProp.herf}></a>
</div>