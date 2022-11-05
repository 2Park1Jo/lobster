import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";

const useStyles = makeStyles(() => ({
root: {
    maxWidth: 304,
    width: 400,
    margin: "auto",
    boxShadow: "none",
    borderRadius: 30
},
content: {
    padding: 24
},
cta: {
    marginTop: 24,
    textTransform: "initial"
},
media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
},
}));

export default function WorkspaceCard({image, overline, heading, body}) {
    const styles = useStyles();
    const textCardContentStyles = useN01TextInfoContentStyles();
    const shadowStyles = useBouncyShadowStyles();

    return (
        <Card className={clsx(styles.root, shadowStyles.root)}>
            <CardMedia
                className={styles.media}
                image={image}
            />
            <CardContent className={styles.content}>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={"마감일 : " + overline}
                    heading={heading}
                    body={body}
                    />
                    <Button color={"primary"} fullWidth className={styles.cta}>
                        Find Out More <ChevronRightRounded />
                    </Button>
            </CardContent>
        </Card>
    );
};
