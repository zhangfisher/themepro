import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import '../components/Button/index'

const meta: Meta = {
    title: '通用/AutoButton',
    args: {
        label: '按钮',
        type: 'default',
        size: 'medium',
        shape: undefined,
        loading: false,
        disabled: false,
        block: false,
        ghost: false,
        icon: undefined,
        variant: undefined,
    },
    argTypes: {
        label: { control: 'text' },
        type: { control: 'select', options: ['default', 'primary', 'info', 'danger', 'warning', 'success', 'link'] },
        size: { control: 'select', options: ['x-small', 'small', 'medium', 'large', 'x-large'] },
        shape: { control: 'select', options: ['circle', 'pill', undefined] },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        block: { control: 'boolean' },
        ghost: { control: 'boolean' },
        icon: { control: 'text' },
        variant: { control: 'select', options: ['outline', 'text', 'ghost', undefined] },
    },
    render: (args: any) => html`
      <auto-button
        label=${args.label}
        type=${args.type}
        size=${args.size}
        shape=${ifDefined(args.shape)}
        icon=${ifDefined(args.icon)}
        ?loading=${args.loading}
        ?disabled=${args.disabled}
        ?block=${args.block}
        ?ghost=${args.ghost}
      >    
      </auto-button>
  `,
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ButtonType: Story = {
    name: '语义按钮',
    render: (args: any) => {
        return html`
        <auto-flex gap="1em">
          <auto-button label=${args.label}>默认</auto-button>
          <auto-button type="primary" label=${args.label}>关健按钮</auto-button>
          <auto-button type="success" label=${args.label}>成功按钮</auto-button>
          <auto-button type="danger" label=${args.label}>危险按钮</auto-button>
          <auto-button type="warning" label=${args.label}>警告按钮</auto-button>
          <auto-button type="info" label=${args.label}>信息按钮</auto-button>
        </auto-flex>
        `
    },
}
export const ButtonSize: Story = {
    name: '按钮尺寸',
    render: (args: any) => {
        return html`
        <auto-flex gap="1em">
          <auto-button label=${args.label}>默认</auto-button>
          <auto-button size="x-small" label="微小按钮"></auto-button>
          <auto-button size="small" label="小按钮"></auto-button>
          <auto-button size="medium" label="默认尺寸按钮"></auto-button>
          <auto-button size="large" label="大按钮"></auto-button>
          <auto-button size="x-large" label="超大按钮"></auto-button>
        </auto-flex>
        `
    },
}
export const ButtonShape: Story = {
    name: '按钮形状',
    render: (args: any) => {
        return html`
        <auto-flex gap="0.5em" direction="column">
          <auto-flex gap="1em">
            <auto-button label=${args.label} shape="circle">默认</auto-button>
            <auto-button size="x-small"  shape="circle" label="微小按钮"></auto-button>
            <auto-button size="small"  shape="circle" label="小按钮"></auto-button>
            <auto-button size="medium"  shape="circle" label="默认尺寸按钮"></auto-button>
            <auto-button size="large"  shape="circle" label="大按钮"></auto-button>
            <auto-button size="x-large"  shape="circle" label="超大按钮"></auto-button>
          </auto-flex>
          
          <auto-flex gap="1em">
            <auto-button label=${args.label} shape="pill">默认</auto-button>
            <auto-button size="x-small"  shape="pill" label="微小按钮"></auto-button>
            <auto-button size="small"  shape="pill" label="小按钮"></auto-button>
            <auto-button size="medium"  shape="pill" label="默认尺寸按钮"></auto-button>
            <auto-button size="large"  shape="pill" label="大按钮"></auto-button>
            <auto-button size="x-large"  shape="pill" label="超大按钮"></auto-button>
          </auto-flex>
        </auto-flex>
        `
    },
}
export const ButtonIcon: Story = {
    name: '按钮图标',
    render: (args: any) => {
        return html`
        <auto-flex gap="0.5em" direction="column">
          <auto-flex gap="1em">
              <auto-button icon="home"></auto-button>
              <auto-button icon="settings"  type="primary"></auto-button>
              <auto-button  icon="tag" type="success" ></auto-button>
              <auto-button  icon="star" type="danger" ></auto-button>
              <auto-button  icon="folder" type="warning" ></auto-button>
              <auto-button  icon="file"  type="info" ></auto-button>
            </auto-flex>
             <auto-flex gap="1em">
              <auto-button icon="home" size="small"></auto-button>
              <auto-button icon="settings" size="small" type="primary"></auto-button>
              <auto-button  icon="tag" type="success" size="small"></auto-button>
              <auto-button  icon="star" type="danger" size="small"></auto-button>
              <auto-button  icon="folder" type="warning" size="small"></auto-button>
              <auto-button  icon="file"  type="info" size="small"></auto-button>
            </auto-flex>
            <auto-flex gap="1em">
              <auto-button shape="circle" icon="home" ></auto-button>
              <auto-button shape="circle" icon="settings"  type="primary" ></auto-button>
              <auto-button shape="circle" icon="tag" type="success" ></auto-button>
              <auto-button shape="circle" icon="star" type="danger" ></auto-button>
              <auto-button shape="circle" icon="folder" type="warning" ></auto-button>
              <auto-button shape="circle" icon="file"  type="info" ></auto-button>
            </auto-flex>            
            <auto-flex gap="1em">
              <auto-button shape="pill" icon="home" ></auto-button>
              <auto-button shape="pill" icon="settings"  type="primary" ></auto-button>
              <auto-button shape="pill" icon="tag" type="success" ></auto-button>
              <auto-button shape="pill" icon="star" type="danger" ></auto-button>
              <auto-button shape="pill" icon="folder" type="warning" ></auto-button>
              <auto-button shape="pill" icon="file"  type="info" ></auto-button>
            </auto-flex>
            <auto-flex gap="1em">
              <auto-button icon="home" label=${args.label}>默认</auto-button>
              <auto-button icon="settings"  type="primary" label=${args.label}>关健按钮</auto-button>
              <auto-button  icon="tag" type="success" label=${args.label}>成功按钮</auto-button>
              <auto-button  icon="star" type="danger" label=${args.label}>危险按钮</auto-button>
              <auto-button  icon="folder" type="warning" label=${args.label}>警告按钮</auto-button>
              <auto-button  icon="file"  type="info" label=${args.label}>信息按钮</auto-button>
            </auto-flex>
            <auto-flex gap="1em">
              <auto-button shape="circle" icon="home" label=${args.label}>默认</auto-button>
              <auto-button shape="circle" icon="settings"  type="primary" label=${args.label}>关健按钮</auto-button>
              <auto-button shape="circle" icon="tag" type="success" label=${args.label}>成功按钮</auto-button>
              <auto-button shape="circle" icon="star" type="danger" label=${args.label}>危险按钮</auto-button>
              <auto-button shape="circle" icon="folder" type="warning" label=${args.label}>警告按钮</auto-button>
              <auto-button shape="circle" icon="file"  type="info" label=${args.label}>信息按钮</auto-button>
            </auto-flex>            
            <auto-flex gap="1em">
              <auto-button shape="pill" icon="home" label=${args.label}>默认</auto-button>
              <auto-button shape="pill" icon="settings"  type="primary" label=${args.label}>关健按钮</auto-button>
              <auto-button shape="pill" icon="tag" type="success" label=${args.label}>成功按钮</auto-button>
              <auto-button shape="pill" icon="star" type="danger" label=${args.label}>危险按钮</auto-button>
              <auto-button shape="pill" icon="folder" type="warning" label=${args.label}>警告按钮</auto-button>
              <auto-button shape="pill" icon="file"  type="info" label=${args.label}>信息按钮</auto-button>
            </auto-flex>
        </auto-flex>
        `
    },
}
export const ButtonDisabled: Story = {
    name: '禁用按钮',
    render: () => {
        return html`
          <auto-flex gap="1em">
            <auto-button disabled>默认</auto-button>
            <auto-button type="primary" disabled>关健按钮</auto-button>
            <auto-button type="success" disabled>成功按钮</auto-button>
            <auto-button type="danger" disabled>危险按钮</auto-button>
            <auto-button type="warning" disabled>警告按钮</auto-button>
            <auto-button type="info" disabled>信息按钮</auto-button>
          </auto-flex>
        `
    },
}
export const PropBlock: Story = { args: { block: true, label: '块级按钮' } }
export const PropGhost: Story = { args: { ghost: true } }
export const PropIcon: Story = { args: { icon: 'settings', label: '带图标' } }
export const PropVariant: Story = { args: { variant: 'outline' } }
