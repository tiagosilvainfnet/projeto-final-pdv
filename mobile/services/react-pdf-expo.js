import React from "react";
import { Image as RImage, Text as RText, View as RView } from "react-native";

export function generateHTMLDoc(reactElement) {
  if (!reactElement) return "";

  if (Array.isArray(reactElement)) {
    let html = "";
    reactElement.forEach((child) => {
      html += generateHTMLDoc(child);
    });
    return html;
  }

  if (typeof reactElement === "string" || typeof reactElement === "number") {
    return reactElement;
  }

  let children = "";
  if (typeof reactElement.props.children === "string") {
    children = reactElement.props.children;
  }

  if (Array.isArray(reactElement.props.children)) {
    reactElement.props.children.forEach((child) => {
      children += generateHTMLDoc(child);
    });
  }

  if (typeof reactElement.props.children === "object") {
    children = generateHTMLDoc(reactElement.props.children);
  }

  const component = new reactElement.type();
  return component.generateHtml({
    child: children,
    style: jssStyletoHtmlStyle(reactElement.props.style),
    page: reactElement.props.page,
  });
}

function jssStyletoHtmlStyle(style) {
  // eg: { color: 'red', fontSize: 12 } => 'color: red; font-size: 12px;'
  let htmlStyle = "";
  if (!style) return htmlStyle;
  for (const [key, value] of Object.entries(style)) {
    // convert camelCase to kebab-case
    const kebabKey = key
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    if (typeof value === "number") {
      htmlStyle += `${kebabKey}: ${value}px;`;
      continue;
    }
    htmlStyle += `${kebabKey}: ${value};`;
  }
  return htmlStyle;
}

class Document extends React.Component {
  generateHtml({ child, style }) {
    return `<html style="${style}">
              <head><head>
              ${child}
            </html>`;
  }

  render() {
    return <RView style={this.props.style}>{this.props.children}</RView>;
  }
}

class Page extends React.Component {
  generateHtml({ child, style, ...others }) {
    switch (others.page) {
      case "A4":
        style += "width: 210mm; height: 297mm;";
        break;
      case "A5":
        style += "width: 148mm; height: 210mm;";
        break;
      case "A6":
        style += "width: 105mm; height: 148mm;";
        break;
      default:
        break;
    }
    return `<body style="${style}">
              ${child}
          </body>`;
  }

  render() {
    return <RView style={this.props.style}>{this.props.children}</RView>;
  }
}

class View extends React.Component {
  generateHtml({ child, style }) {
    return `<div style="${style}">
              ${child}
          </div>`;
  }

  render() {
    return (
      <RView key={this.props.idx} style={this.props.style}>
        {this.props.children}
      </RView>
    );
  }
}

class Text extends React.Component {
  generateHtml({ child, style }) {
    return `<p style="${style}">
              ${child}
          </p>`;
  }

  render() {
    return <RText style={this.props.style}>{this.props.children}</RText>;
  }
}

class Image extends React.Component {
  generateHtml({ style }) {
    return `<img src="${this.props.src}" style="${style}">`;
  }

  render() {
    return <RImage style={this.props.style}>{this.props.children}</RImage>;
  }
}

export { Document, Page, View, Text, Image };
