import React from 'react'
import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { useTranslations } from '../../context/TranslationsContext'


export const MultiGraph = ({ seriesData }) => {
    const { t } = useTranslations();
    
    Highcharts.setOptions({
        lang: {
            months: [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')],
            shortMonths: [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')],
            numericSymbols: undefined,
        },
        rangeSelector: {
            selected: 2 //6 months
        }
    })

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={{
                styledMode: true,
                // Better colors because the default colors don't have enough contrast on dark mode
                colors: ['#058DC7', '#50B432', '#ED561B', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                credits: false,
                scrollbar: {
                    enabled: false
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: t('price')
                    },
                    height: '100%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    }
                }],
                tooltip: {
                    backgroundColor: "var(--background-color)",
                    split: true,
                    xDateFormat: '%Y-%m-%d',
                    shared: true
                },
                rangeSelector: {
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: t('1m')
                    }, {
                        type: 'month',
                        count: 3,
                        text: t('3m')
                    }, {
                        type: 'month',
                        count: 6,
                        text: t('6m')
                    }, {
                        type: 'ytd',
                        text: t('ytd')
                    }, {
                        type: 'year',
                        count: 1,
                        text: t('1y')
                    }, {
                        type: 'all',
                        text: t('all')
                    }],
                },
                plotOptions: {
                    area: {
                        stacking: 'percentage',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    },
                    series: {
                        turboThreshold: 0,
                    }
                },
                series: seriesData,
            }}

            constructorType={"stockChart"}
        />
    )
}