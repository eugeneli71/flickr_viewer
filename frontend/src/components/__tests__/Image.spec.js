import { describe, it, expect } from 'vitest'
import { mount} from '@vue/test-utils'
import Image from '../Image.vue'
import {Card} from 'ant-design-vue'
describe('Image', () => {

  it('renders properly', () => {
    const wrapper = mount(Image, {
      global: {
        components: {
          'a-card-meta': Card.Meta,
          'a-card':Card
        }
      }, 
      props: { title: 'img1',link:'https://live.staticflickr.com/65535/51910385268_f3bc24aab5_m.jpg' } 
    })
    
    // should show title
    expect(wrapper.html()).toContain('img1')
    // should have img tag
    expect(wrapper.find('img').exists()).toBe(true)
    // should have only 1 img tag
    expect(wrapper.findAll('img')).toHaveLength(1);
    //img tag should have alt=img1
    expect(wrapper.find('img').attributes('alt')).toBe('img1')
    

  })
})
