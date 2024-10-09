import Header from "@/components/header"
import Badge from "../../components/ui/badge"
import CheckBox from "../../components/ui/checkbox"
import { UploadsIcon } from "../../components/ui/icons"
import styles from "./updates.module.css"
import Title from "@/components/ui/typography/title"
import Label from "@/components/ui/typography/label"
export const Updates = () => {
    return( 
        <>
            <div className={styles['container']}>
                   <Header title="Updates"/>
                    <div className={styles['ContainerBox']}>
                <section className={styles['leftBox']}>
                    <Title variant="T3" className={styles['subTitle']} children="Grid Eye Edge System Status" />
                        <div className={styles['leftBoxRow']}>
                            <CheckBox className={styles['checkBoxStyle']} label="Citrus Heights" />
                            <Label className={styles['idLink']} children="10.20.0.120" />
                            <Badge className={styles['badgeBoxSuccess']} children='Downloaded' variant="success" />
                        </div>
                                    
                        <div className={styles['leftBoxRow']}>
                            <CheckBox className={styles['checkBoxStyle']} label="Citrus Heights"/>
                            <Label className={styles['idLinkWarning']} children="10.20.0.120" />
                            <Badge className={styles['badgeBoxWarning']} children='In Progress' variant="warning" />
                        </div>
                                    
                        <div className={styles['leftBoxRow']}>
                            <CheckBox className={styles['checkBoxStyle']} label="Citrus Heights"/>
                            <Label className={styles['idLinkDanger']} children="10.20.0.120" />
                            <Badge className={styles['badgeBoxDanger']} children='Failed' variant="danger" />
                        </div>
                                    
                        <div className={styles['leftBoxRow']}>
                            <CheckBox className={styles['checkBoxStyle']} label="Citrus Heights"/>
                            <Label className={styles['idLink']} children="10.20.0.120" />
                            <Badge className={styles['badgeBoxSuccess']} children='Downloaded' variant="success" />
                        </div>
                                    
                        <div className={styles['leftBoxRow']}>
                            <CheckBox className={styles['checkBoxStyle']} label="Citrus Heights"/>
                            <Label className={styles['idLinkDanger']} children="10.20.0.120" />
                            <Badge className={styles['badgeBoxDanger']} children='Failed' variant="danger" />
                        </div>
                </section>
                    
                <section className={styles['rightBox']}>
                    <Title variant="T3" className={styles['subTitle']} children="Upload for Grid Eye Edge" />
                        <div className={styles['rightBoxCard']}>
                            <p className={styles['uploadIconStyle']}><UploadsIcon width="90px" height="90px" /></p>
                            <span className={styles['titleText']}>Upload</span>
                        </div>
                </section>
            </div></div>
        </>
    )
}