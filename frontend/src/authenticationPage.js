import React from 'react'
import storage from "./utils/storage"
import { Redirect } from 'react-router-dom'

export function authenticatedPage(Component) {
    const componentName = Component.displayName || Component.name || 'Component'

    return class extends React.Component {
        static displayName = `Route(${componentName})`

        renderPage() {
            return (
                <Component {...this.props} />
            )
        }

        render() {
            const token = storage.get("accessToken")
            if (token) {
                return this.renderPage()
            } else {
                return <Redirect to='/login' />
            }
        }
    }
}