
import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
    path?: string | null;
    fallback: number;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
    const [image, setImage] = useState('');
    let bucket = 'product-images'
    if (path?.includes('/')) {
        bucket = path.split('/')[0]
        path = path.split('/')[1]
    }
    useEffect(() => {
        if (!path) return;
        (async () => {
            setImage('');
            const { data, error } = await supabase.storage
                .from(bucket)
                .download(path);

            if (error) {
                console.log(error);
            }

            if (data) {
                const fr = new FileReader();
                fr.readAsDataURL(data);
                fr.onload = () => {
                    setImage(fr.result as string);
                };
            }
        })();
    }, [path]);

    if (!image) {
        // console.log('hit me harddd..');

    }
    //console.log('remote image is ', image ? "ok" : image);

    return <Image source={{ uri: image ? image : undefined }} defaultSource={fallback} {...imageProps} />;
};

export default RemoteImage;
