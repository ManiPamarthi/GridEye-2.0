import Header from "@/components/header";
import styles from "./grid-eye-edge.module.css";
import { CaretIcon, CopyIcon, DeleteIcon } from "@/components/ui/icons";
import Label from "@/components/ui/typography/label";
import Title from "@/components/ui/typography/title";
import Paragraph from "@/components/ui/typography/paragragh";
export const GridEyeEdge = () => {
    return(
        <>
        <div className={styles['Container']}>
            <Header title="Grid Eye Edge" actions={[{
                    title:'ADD',
                    onClick:() => alert('hello'),
                    variant:'PRIMARY'
                    }]} />

        <section className={styles['rowCard']}>
                <div className={styles['edgeStyle']}>
                   <Title variant="T4" className={styles['smallTitle']} children="Citrus Heights" />
                   <Label className={styles['idLink']} children="10.20.0.180" />
                   <Label className={styles['smallText']} children="38.69695241485017" />
                   <Label className={styles['smallTextOne']} children="-38.69695241485017" />
                   <Label className={styles['caretIonStyle']} children /><CaretIcon width="24px" height="24px" />
                </div>
        </section>
        <section className={styles['rowCard']}>
            <div className={styles['edgeStyle']}>
            <Title variant="T4" className={styles['smallTitle']} children="Citrus Heights" />
                   <Label className={styles['idLink']} children="10.20.0.120" />
                   <Label className={styles['smallText']} children="38.69695241485017" />
                   <Label className={styles['smallTextOne']} children="-38.69695241485017" />
                   <Label className={styles['caretIonStyle']} children /><CaretIcon width="24px" height="24px" />
            </div>
        </section>
        <section className={styles['rowCard']}>
            <div className={styles['edgeStyle']}>
            <Title variant="T4" className={styles['smallTitle']} children="Citrus Heights" />
                   <Label className={styles['idLink']} children="10.20.0.90" />
                   <Label className={styles['smallText']} children="38.69695241485017" />
                   <Label className={styles['smallTextOne']} children="-38.69695241485017" />
                   <Label className={styles['caretIonStyle']} children /><CaretIcon width="24px" height="24px" />
            </div>
        </section>
        <section className={styles['rowCardOne']}>
            <div className={styles['edgeStyle']}>
                   <p className={styles['smallTitle']}>Citrus Heights</p>
                   <small className={styles['idLink']}>10.20.0.180</small>
                   <small className={styles['timeText']}>Seen:4 months ago</small>
                   <small className={styles['caretIonStyleOne']}><CaretIcon width="24px" height="24px" /></small>

                        <div className={styles['content']}>
                    <div className={styles['boxStyleOne']}>
                    <Label className={styles['smallLabel']} children="Total Alerts" />
                    <Title variant='T3' className={styles['digiStyle']} children="779" />
                    </div>
                    <div className={styles['boxStyleTwo']}>
                    <Label className={styles['smallLabel']} children="Activation Key:" />
                    <Paragraph variant='P4' className={styles['digiStyleKey']} children='93u3u483523uakfsjn7h83n8h'/>
                    </div>
                    <div className={styles['boxStyleThree']}>
                    <Label className={styles['smallLabel']} children="Delete Key" />
                   <p className={styles['deleteIcon']}><DeleteIcon width="24" height="24"/></p>
                    </div>
            </div></div>
        </section>
        <section className={styles['rowCard']}>
            <div className={styles['edgeStyle']}>
            <Title variant="T4" className={styles['smallTitle']} children="Citrus Heights" />
                   <Label className={styles['idLink']} children="10.20.0.90" />
                   <Label className={styles['smallText']} children="38.69695241485017" />
                   <Label className={styles['smallTextOne']} children="-38.69695241485017" />
                   <Label className={styles['caretIonStyle']} children /><CaretIcon width="24px" height="24px" />
            </div>
        </section>
        <section className={styles['rowCard']}>
            
            <div className={styles['edgeStyle']}>
            <Title variant="T4" className={styles['smallTitle']} children="Citrus Heights" />
                   <Label className={styles['idLink']} children="10.20.0.144" />
                   <Label className={styles['smallText']} children="38.69695241485017" />
                   <Label className={styles['smallTextOne']} children="-38.69695241485017" />
                   <Label className={styles['caretIonStyle']} children /><CaretIcon width="24px" height="24px" />
            </div>
        </section>
    </div>
    </>
    )
}