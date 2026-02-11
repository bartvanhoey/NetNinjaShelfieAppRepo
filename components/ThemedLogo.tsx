import { Image} from 'react-native'
import React from 'react'
import DarkLogo from '../assets/logo_dark.png'
import LightLogo from '../assets/logo_light.png'
import { useColorScheme } from 'react-native'



const ThemedLogo = ({...props}) => {
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;
  return (
    <Image source={logo} {...props} />
  )
}

export default ThemedLogo

