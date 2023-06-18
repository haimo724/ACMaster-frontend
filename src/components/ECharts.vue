<template>
    <div ref="e" :style="sty"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    sty: String,
    options: {
      type: Object,
      default: () => {
        return {
          series: [
            {
              type: 'pie',
              data: [
                {
                  value: 335,
                  name: '直接访问'
                },
                {
                  value: 234,
                  name: '联盟广告'
                },
                {
                  value: 1548,
                  name: '搜索引擎'
                }
              ]
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      echart: null
    }
  },
  watch: {
    options: {
      handler: function () {
        this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart () {
      if (!this.echart) {
        this.echart = echarts.init(this.$refs.e)
      }
      this.echart.setOption(this.options)
    }
  }
}
</script>

<style scoped>

</style>
