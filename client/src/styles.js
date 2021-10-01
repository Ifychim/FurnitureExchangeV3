import {makeStyles} from "@material-ui/core/styles";

//how to structure styles using material-ui
export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(42,46,46, 1)',
      },
      image: {
        marginLeft: '15px',
      },
}));