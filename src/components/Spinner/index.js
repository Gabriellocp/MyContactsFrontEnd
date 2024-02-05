import React from 'react'
import styles from './styles.scss'
import PropTypes from 'prop-types'
export default function Spinner({size}){
    return (
        <div className={styles.spinner} style={{fontSize: `${size}px`}}>

        </div>
    )
}

Spinner.propTypes = {
    size: PropTypes.number
}

Spinner.defaultProps = {
    size: 90
}
