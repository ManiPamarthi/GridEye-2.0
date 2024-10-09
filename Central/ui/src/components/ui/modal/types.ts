import {Props} from 'react-modal';

type TModalVariants = 'CENTERED' | 'LEFT_PANEL' | 'RIGHT_PANEL';

export interface IModalProps extends Props {
appElementId?:string;
portalElementId?:string;
variant: TModalVariants;
};