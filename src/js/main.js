import m from 'mithril'
import '@node/bootstrap/dist/js/bootstrap.bundle.js'
import '@scss/cellpost.scss'
import { getRoutes } from './app/router/router'


m.route(document.getElementById("app"), "/", getRoutes())
