import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import '../components/Button/index'
import { fn } from 'storybook/test'

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
        icon: undefined,
        variant: undefined,
        onClick: fn(),
        onAutoClick: fn(),
    },
    argTypes: {
        label: { control: 'text' },
        type: { control: 'select', options: ['default', 'primary', 'info', 'danger', 'warning', 'success', 'link'] },
        size: { control: 'select', options: ['x-small', 'small', 'medium', 'large', 'x-large'] },
        shape: { control: 'select', options: ['circle', 'pill', undefined] },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        block: { control: 'boolean' },
        variant: { control: 'select', options: [undefined, 'default', 'ghost', 'link', 'outline'] },
        icon: { control: 'text' },
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
        variant=${args.variant}
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
          <auto-button label=${args.label}  @click=${args.onClick}>默认</auto-button>
          <auto-button size="x-small" label="微小按钮" @autoclick=${args.onAutoClick}></auto-button>
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
            <auto-button disabled label="默认"></auto-button>
            <auto-button type="primary" disabled label="关健按钮"></auto-button>
            <auto-button type="success" disabled label="成功按钮"></auto-button>
            <auto-button type="danger" disabled label="危险按钮"></auto-button>
            <auto-button type="warning" disabled label="警告按钮"></auto-button>
            <auto-button type="info" disabled label="信息按钮"></auto-button>
          </auto-flex>
        `
    },
}
export const ButtonVeriDisabled: Story = {
    name: '垂直布局按钮',
    render: () => {
        return html`
          <auto-flex gap="1em">
            <auto-button vertical icon="home" label="主页"></auto-button>
              <auto-button vertical icon="settings"  type="primary" label="系统设置系统设置系统设置系统设置" labelWidth="5em"></auto-button>
              <auto-button vertical icon="tag" type="success" label="标签"></auto-button>
              <auto-button vertical icon="star" type="danger" label="加星"></auto-button>
              <auto-button vertical icon="folder" type="warning" label="文件夹"></auto-button>
              <auto-button vertical icon="file"  type="info" label="文件"></auto-button>
          </auto-flex>
        `
    },
}
export const ButtonLoading: Story = {
    name: '加载中',
    render: () => {
        return html`
        <auto-flex direction='column' gap="1em">
          <auto-flex gap="1em">
            <auto-button loading label="默认"></auto-button>
            <auto-button type="primary" loading label="关健按钮"></auto-button>
            <auto-button type="success" loading label="成功按钮"></auto-button>
            <auto-button type="danger" loading label="危险按钮"></auto-button>
            <auto-button type="warning" loading label="警告按钮"></auto-button>
            <auto-button type="info" loading label="信息按钮"></auto-button>
          </auto-flex>
          <auto-flex gap="1em">
            <auto-button size="x-small" loading label="默认"></auto-button>
            <auto-button size="x-small"  type="primary" loading label="关健按钮"></auto-button>
            <auto-button size="x-small"  type="success" loading label="成功按钮"></auto-button>
            <auto-button size="x-small" type="danger" loading label="危险按钮"></auto-button>
            <auto-button size="x-small" type="warning" loading label="警告按钮"></auto-button>
            <auto-button size="x-small" type="info" loading label="信息按钮"></auto-button>
          </auto-flex>
          </auto-flex>
        `
    },
}
export const ButtonGHost: Story = {
    name: '幽灵按钮',
    render: () => {
        return html`
        <auto-flex direction='column' gap="1em">
          <auto-flex gap="1em">
            <auto-button  icon="home" variant='ghost' label="默认"></auto-button>
            <auto-button  icon="settings" type="primary" variant='ghost' label="关健按钮"></auto-button>
            <auto-button  icon="tag" type="success" variant='ghost' label="成功按钮"></auto-button>
            <auto-button  icon="star" type="danger" variant='ghost' label="危险按钮"></auto-button>
            <auto-button  icon="folder" type="warning" variant='ghost' label="警告按钮"></auto-button>
            <auto-button  icon="file" type="info" variant='ghost' label="信息按钮"></auto-button>
          </auto-flex>
          <auto-flex gap="1em">
            <auto-button icon="home"  size="x-small" variant='ghost' label="默认"></auto-button>
            <auto-button icon="settings" size="x-small"  type="primary" variant='ghost' label="关健按钮"></auto-button>
            <auto-button icon="tag" size="x-small"  type="success" variant='ghost' label="成功按钮"></auto-button>
            <auto-button icon="star" size="x-small" type="danger" variant='ghost' label="危险按钮"></auto-button>
            <auto-button icon="folder" size="x-small" type="warning" variant='ghost' label="警告按钮"></auto-button>
            <auto-button icon="file" size="x-small" type="info" variant='ghost' label="信息按钮"></auto-button>
          </auto-flex>
          </auto-flex>
        `
    },
}
export const ButtonOutline: Story = {
    name: '边框按钮',
    render: () => {
        return html`
        <auto-flex direction='column' gap="1em">
          <auto-flex gap="1em">
            <auto-button  icon="home" variant='outline' label="默认"></auto-button>
            <auto-button  icon="settings" type="primary" variant='outline' label="关健按钮"></auto-button>
            <auto-button  icon="tag" type="success" variant='outline' label="成功按钮"></auto-button>
            <auto-button  icon="star" type="danger" variant='outline' label="危险按钮"></auto-button>
            <auto-button  icon="folder" type="warning" variant='outline' label="警告按钮"></auto-button>
            <auto-button  icon="file" type="info" variant='outline' label="信息按钮"></auto-button>
          </auto-flex> 
          <auto-flex gap="1em">
            <auto-button icon="home"  size="small" variant='outline' label="默认"></auto-button>
            <auto-button icon="settings" size="small"  type="primary" variant='outline' label="关健按钮"></auto-button>
            <auto-button icon="tag" size="small"  type="success" variant='outline' label="成功按钮"></auto-button>
            <auto-button icon="star" size="small" type="danger" variant='outline' label="危险按钮"></auto-button>
            <auto-button icon="folder" size="small" type="warning" variant='outline' label="警告按钮"></auto-button>
            <auto-button icon="file" size="small" type="info" variant='outline' label="信息按钮"></auto-button>
          </auto-flex>
          <auto-flex gap="1em">
            <auto-button icon="home"  size="x-small" variant='outline' label="默认"></auto-button>
            <auto-button icon="settings" size="x-small"  type="primary" variant='outline' label="关健按钮"></auto-button>
            <auto-button icon="tag" size="x-small"  type="success" variant='outline' label="成功按钮"></auto-button>
            <auto-button icon="star" size="x-small" type="danger" variant='outline' label="危险按钮"></auto-button>
            <auto-button icon="folder" size="x-small" type="warning" variant='outline' label="警告按钮"></auto-button>
            <auto-button icon="file" size="x-small" type="info" variant='outline' label="信息按钮"></auto-button>
          </auto-flex>
          </auto-flex>
        `
    },
}
export const ButtonChecked: Story = {
    name: '复选按钮',
    render: () => {
        return html`
        <auto-flex direction='column' gap="1em">
          <auto-flex gap="1em">
            <auto-button .props=${{ label: 'aaaa' }}  icon="home" variant='outline' checked label="默认"></auto-button>
            <auto-button  icon="settings" type="primary" variant='outline' checked label="关健按钮"></auto-button>
            <auto-button  icon="tag" type="success" variant='outline' checked label="成功按钮"></auto-button>
            <auto-button  icon="star" type="danger" variant='outline' checked label="危险按钮"></auto-button>
            <auto-button  icon="folder" type="warning" variant='outline' checked label="警告按钮"></auto-button>
            <auto-button  icon="file" type="info" variant='outline' checked label="信息按钮"></auto-button>
          </auto-flex> 
          <auto-flex gap="1em">
            <auto-button icon="home"  size="small" variant='outline'  label="默认"></auto-button>
            <auto-button icon="settings" size="small"  type="primary" variant='outline' checked label="关健按钮"></auto-button>
            <auto-button icon="tag" size="small"  type="success" variant='outline' checked label="成功按钮"></auto-button>
            <auto-button icon="star" size="small" type="danger" variant='outline' checked label="危险按钮"></auto-button>
            <auto-button icon="folder" size="small" type="warning" variant='outline' checked label="警告按钮"></auto-button>
            <auto-button icon="file" size="small" type="info" variant='outline' checked label="信息按钮"></auto-button>
          </auto-flex>
          <auto-flex gap="1em">
            <auto-button icon="home"  size="x-small" variant='outline' checked label="默认"></auto-button>
            <auto-button icon="settings" size="x-small"  type="primary" variant='outline' checked label="关健按钮"></auto-button>
            <auto-button icon="tag" size="x-small"  type="success" variant='outline' checked label="成功按钮"></auto-button>
            <auto-button icon="star" size="x-small" type="danger" variant='outline' checked label="危险按钮"></auto-button>
            <auto-button icon="folder" size="x-small" type="warning" variant='outline' checked label="警告按钮"></auto-button>
            <auto-button icon="file" size="x-small" type="info" variant='outline' checked label="信息按钮"></auto-button>
          </auto-flex>
          </auto-flex>
        `
    },
}
