import { 
  Anton, 
  Bebas_Neue, 
  Montserrat, 
  Oswald, 
  Roboto, 
  Roboto_Flex,
  Barlow_Condensed, 
  Raleway, 
  Play 
} from 'next/font/google';

export const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
export const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
export const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
export const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' });
export const robotoFlex = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto-flex' });
export const barlow = Barlow_Condensed({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-barlow' });
export const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
export const play = Play({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-play' });

export const fontVariables = `
  ${anton.variable} 
  ${bebas.variable} 
  ${montserrat.variable} 
  ${oswald.variable} 
  ${roboto.variable} 
  ${robotoFlex.variable}
  ${barlow.variable} 
  ${raleway.variable} 
  ${play.variable}
`;