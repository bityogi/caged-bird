import theme from 'theme';

const { palette : { primary1Color }} = theme;

const styles = {
  formStyle: {
    padding: '0 1em 1em 1em'
  },
  login_button_styles : {
    margin: 12,
  },
  header_style : {
    margin: 50,
  },
  title_style : {
    marginRight: 20,
  },

  card_action_style : {
    padding: '10px'
  },
  card_style : {
    marginTop: '0em', textAlign: 'justify'
  },
  card_title_style : {
  'fontSize':'30px', fontFamily:'roboto', 'padding':'1rem', 'fontWeight':'bold'
  },
  card_title_style_fancy : {
    'fontSize':'28px', fontFamily:'lobster', 'padding':'1rem', 'fontWeight':'bold'
  },
  card_text_style : {
    'fontSize':'20px', 'padding':'1rem'
  },
  highlighted_text: {
    fontSize: '1.2em',
    color: primary1Color,
    fontWeight: 'bold'
  },
  titleLink: { textDecoration: 'none', color: '#000' },
  card: { borderLeft: 'solid 4px', flex: 1, marginRight: '1em', borderColor: primary1Color },
  icon: { float: 'right', fontSize: 64, padding: 16, color: primary1Color },
  avatar: { margin: 5 },
};

export default styles;
