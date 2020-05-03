import { trigger, sequence, animate, transition, style, state } from '@angular/animations';

export const colorFadeOut = trigger('colorFadeOut', [
    state('void', style({ background: 'cyan', borderBottomColor: 'cyan', opacity: 0, transform: 'translateX(-550px)', 'box-shadow': 'none' })),
    transition('void => *', [animate(".5s ease")]),
    transition('* => void', [animate(".5s ease")]),
]);

export const fadeIn = trigger('fadeIn', [
    transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
            animate(".5s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
            animate(".5s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
    ])
]);

export const scrollToAndBlink = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('blink-me'); // Defined on styles.sass
    }
}
