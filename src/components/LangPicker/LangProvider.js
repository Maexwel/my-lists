import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { C } from '../../lang';
import { ServiceLocatorContext } from '../context';
import { connect } from 'react-redux';
import { updateSelectedLangAction } from '../../store/actions/langActions';

// Provider of translation
const LangProvider = ({ data, selectedLang, langToState, children }) => {
    const { localStorageManager, langManager } = useContext(ServiceLocatorContext);

    // on init
    useEffect(() => {
        localStorageManager.getItem(localStorageManager.KEYS.LANG_DATA)
            .then(({ selectedLang }) => {
                if (data && selectedLang) {
                    langToState({ selectedLang }); // Redux set selectedLang
                    localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, selectedLang); // local storage
                } else {
                    langToState({ selectedLang: C.LANG_FR }); // Redux set selectedLang (default fr)
                    localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, C.LANG_FR); // local storage
                }
            })
            .catch((err) => {
                // Error is thrown, there is no items in local storage
                langToState({ selectedLang: C.LANG_FR }); // Redux set selectedLang (default fr)
                localStorageManager.setItem(localStorageManager.KEYS.LANG_DATA, C.LANG_FR); // local storage
            }); // get lang data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Reaction to a change in the selectedLang
    useEffect(() => {
        const translation = langManager.translate(selectedLang, data); // translate to selected lang
        langToState({ translation }); // Redux update translation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLang]);

    return (<React.Fragment>{children}</React.Fragment>)
};
LangProvider.propTypes = {
    data: PropTypes.object,
    translation: PropTypes.object,
    langToState: PropTypes.func,
    children: PropTypes.node, // children because it's a wrapper
};
// // // 
// Redux connexion
const mapStateToProps = state => ({
    selectedLang: state.lang.selectedLang, // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
        langToState: (val) => {
            dispatch(
                updateSelectedLangAction(val) // Update the lang
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LangProvider);