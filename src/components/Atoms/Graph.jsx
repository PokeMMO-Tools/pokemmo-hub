import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useTranslations } from '../../context/TranslationsContext'
import { prices as PricesApi } from '../../utils/prices'
import { MarketItemActions } from '../Market/MarketItemActions'
export const Graph = ({ name, id, hideItemActions = false }) => {
    const { t } = useTranslations();

    const { data: prices } = useQuery(
        ["prices", id],
        () => PricesApi.getItem(id),
        { staleTime: 180000 }
    )

    const { data: quantities } = useQuery(
        ["quantity", id],
        () => PricesApi.getItemQuantity(id),
        { staleTime: 180000 }
    )


    Highcharts.setOptions({
        lang: {
            months: [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')],
            shortMonths: [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')],
            numericSymbols: undefined
        },
        rangeSelector: {
            selected: 2 //6 months
        },
    }) //i am so sorry for this, it doesnt work in the config code


    return (
        <div className='position-relative display-block'>
            {
                !hideItemActions ? <MarketItemActions className='mb-1 d-flex' style={{ gap: '.4rem' }} id={id} /> : false
            }

            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    title: {
                        text: name,
                        align: "left"
                    },
                    styledMode: true,
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
                        height: '60%',
                        lineWidth: 2,
                        resize: {
                            enabled: true
                        }
                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: t('supply')
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],
                    tooltip: {
                        backgroundColor: "var(--background-color)",
                        split: true,
                        xDateFormat: '%Y-%m-%d',
                        shared: true,
                        pointFormat: '{series.name}: <b>{point.y:.0f}</b>',
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
                    series: [{
                        name: t("Price"),
                        color: {
                            linearGradient: [0, 0, 0, 250],
                            stops: [
                                [0, '#198754'],
                                [0.7, '#ffc107'],
                                [1, '#dc3545']
                            ]
                        },
                        data: prices ? prices : []
                    },
                    {
                        name: t("Item in market"),
                        data: quantities ? quantities : [],
                        yAxis: 1,
                    }]
                }}

                constructorType={"stockChart"}
            />
            {
                typeof prices === 'undefined' && typeof quantities === 'undefined' ? <Spinner className='position-absolute' style={{ width: "4rem", height: "4rem", top: "45%", left: "45%" }} animation="border" variant="warning" /> : false
            }

        </div>
    )
}