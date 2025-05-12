document.addEventListener('DOMContentLoaded', function () {
    // --- Referências Globais de Elementos ---
    const elements = {
        // Receitas
        numPatientsSlider: document.getElementById('numPatientsSlider'),
        numPatientsNumber: document.getElementById('numPatientsNumber'),
        monthlyFeeSlider: document.getElementById('monthlyFeeSlider'),
        monthlyFeeNumber: document.getElementById('monthlyFeeNumber'),
        grossRevenueTotalDisplay: document.getElementById('grossRevenueTotal'),
        // Custos e Despesas Op.
        expenseItemsContainer: document.getElementById('expense-items-container'),
        totalOpExpensesDisplay: document.getElementById('totalOpExpensesDisplay'),
        // Pró-Labore
        proLaboreItemsContainer: document.getElementById('prolabore-items-container'),
        totalProLaboreDisplay: document.getElementById('totalProLaboreDisplay'),
        totalProLaboreChargesDisplay: document.getElementById('totalProLaboreChargesDisplay'),
        // Impostos
        taxRateSlider: document.getElementById('taxRateSlider'),
        taxRateNumber: document.getElementById('taxRateNumber'),
        taxRateDisplay: document.getElementById('taxRateDisplay'),
        taxAlert: document.getElementById('taxAlert'),
        totalTaxesDisplay: document.getElementById('totalTaxesDisplay'),
        // PNL
        resultGrossRevenue: document.getElementById('resultGrossRevenue'),
        resultTotalOpExpenses: document.getElementById('resultTotalOpExpenses'),
        resultTotalProLabore: document.getElementById('resultTotalProLabore'),
        resultTotalProLaboreCharges: document.getElementById('resultTotalProLaboreCharges'),
        resultTotalTaxes: document.getElementById('resultTotalTaxes'),
        netProfitLoss: document.getElementById('netProfitLoss'),
        // Distribuição Lucro
        adminFeePercentSlider: document.getElementById('adminFeePercentSlider'),
        adminFeePercentNumber: document.getElementById('adminFeePercentNumber'),
        adminFeePercentDisplay: document.getElementById('adminFeePercentDisplay'),
        adminFeeValueDisplay: document.getElementById('adminFeeValueDisplay'),
        
        // NOVOS ELEMENTOS E RENAME (da última tentativa, agora corretamente integrados)
        profitAvailableForPartnersAndReserveDisplay: document.getElementById('profitAvailableForPartnersAndReserveDisplay'), // antigo remainingProfitForPartnersDisplay
        partnerDistributionPercentSlider: document.getElementById('partnerDistributionPercentSlider'),
        partnerDistributionPercentNumber: document.getElementById('partnerDistributionPercentNumber'),
        partnerDistributionPercentDisplay: document.getElementById('partnerDistributionPercentDisplay'),
        totalEffectivelyDistributedToPartnersDisplay: document.getElementById('totalEffectivelyDistributedToPartnersDisplay'),
        cashReserveDisplay: document.getElementById('cashReserveDisplay'),

        distPartners: {
            nando: {
                percentSlider: document.getElementById('nandoDistPercentSlider'),
                percentNumber: document.getElementById('nandoDistPercentNumber'),
                percentDisplay: document.getElementById('nandoDistPercentDisplay'),
                valueDisplay: document.getElementById('nandoDistValueDisplay'),
                id: 'nando'
            },
            mariaLucia: {
                percentSlider: document.getElementById('mariaLuciaDistPercentSlider'),
                percentNumber: document.getElementById('mariaLuciaDistPercentNumber'),
                percentDisplay: document.getElementById('mariaLuciaDistPercentDisplay'),
                valueDisplay: document.getElementById('mariaLuciaDistValueDisplay'),
                id: 'mariaLucia'
            },
            daniela: {
                percentSlider: document.getElementById('danielaDistPercentSlider'),
                percentNumber: document.getElementById('danielaDistPercentNumber'),
                percentDisplay: document.getElementById('danielaDistPercentDisplay'),
                valueDisplay: document.getElementById('danielaDistValueDisplay'),
                id: 'daniela'
            }
        },
        partnerPercentSumAlert: document.getElementById('partnerPercentSumAlert'),
        // Export e Gráfico
        exportPdfButton: document.getElementById('exportPdfButton'),
        simuladorContainer: document.getElementById('simuladorContainer'),
        expensesChartCanvas: document.getElementById('expensesChart')
    };

    const SALARY_CLT_EXPENSE_ID = 'salariosEncargosCLT';

    const opExpenseCategories = [ // Mantendo a lista completa do "modelo 3"
        { id: 'aluguelCondominio', label: 'Aluguel e Condomínio (R$)', min: 0, max: 30000, step: 100, defaultValue: 8000 },
        { id: 'iptu', label: 'IPTU (R$)', min: 0, max: 5000, step: 50, defaultValue: 500 },
        { id: 'agua', label: 'Água (R$)', min: 0, max: 3000, step: 50, defaultValue: 400 },
        { id: 'energiaEletrica', label: 'Energia Elétrica (R$)', min: 0, max: 5000, step: 50, defaultValue: 1200 },
        { id: 'telefoneInternet', label: 'Telefone e Internet (R$)', min: 0, max: 1000, step: 20, defaultValue: 300 },
        { id: 'softwaresLicencas', label: 'Softwares e Licenças (R$)', min: 0, max: 2000, step: 50, defaultValue: 250 },
        { id: SALARY_CLT_EXPENSE_ID, label: 'Salários (CLT base + encargos) (R$)', min: 0, max: 150000, step: 1000, defaultValue: 40000 },
        { id: 'contabilidade', label: 'Serviços de Contabilidade (R$)', min: 0, max: 5000, step: 50, defaultValue: 800 },
        { id: 'juridico', label: 'Serviços Jurídicos (R$)', min: 0, max: 5000, step: 50, defaultValue: 300 },
        { id: 'marketingPublicidade', label: 'Marketing e Publicidade (R$)', min: 0, max: 10000, step: 100, defaultValue: 1000 },
        { id: 'materiaisEscritorio', label: 'Materiais de Escritório (R$)', min: 0, max: 1000, step: 20, defaultValue: 150 },
        { id: 'materiaisLimpeza', label: 'Materiais de Limpeza (R$)', min: 0, max: 2000, step: 50, defaultValue: 400 },
        { id: 'produtosHigienePessoal', label: 'Produtos de Higiene Pessoal (Pacientes) (R$)', min: 0, max: 5000, step: 50, defaultValue: 1500 },
        { id: 'alimentacao', label: 'Alimentação (Insumos) (R$)', min: 0, max: 30000, step: 200, defaultValue: 12000 },
        { id: 'medicamentosMateriaisEnfermagem', label: 'Medicamentos e Materiais de Enfermagem (Não cobertos) (R$)', min: 0, max: 10000, step: 100, defaultValue: 2500 },
        { id: 'manutencaoPredialEquipamentos', label: 'Manutenção Predial e Equipamentos (R$)', min: 0, max: 5000, step: 100, defaultValue: 700 },
        { id: 'uniformes', label: 'Uniformes (R$)', min: 0, max: 2000, step: 50, defaultValue: 300 },
        { id: 'despesasVeiculos', label: 'Despesas com Veículos (R$)', min: 0, max: 3000, step: 50, defaultValue: 0 },
        { id: 'despesasBancarias', label: 'Despesas Bancárias (R$)', min: 0, max: 500, step: 10, defaultValue: 100 },
        { id: 'outrasDespesasDiversas', label: 'Outras Despesas Diversas (R$)', min: 0, max: 5000, step: 50, defaultValue: 500 },
    ];
    let currentOpExpenseValues = {};

    const proLaborePartners = [
        { id: 'danielaProLabore', label: 'Pró-Labore Daniela (R$)', min: 0, max: 30000, step: 100, defaultValue: 9002 },
        { id: 'mariaLuciaProLabore', label: 'Pró-Labore Maria Lucia (R$)', min: 0, max: 30000, step: 100, defaultValue: 4800 },
        { id: 'nandoProLabore', label: 'Pró-Labore Nando (R$)', min: 0, max: 30000, step: 100, defaultValue: 4800 }
    ];
    const PRO_LABORE_CHARGE_RATE = 0.11;
    let expensesChartInstance = null;

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function parseFloatInput(element, defaultValue = 0) {
        if (!element) return defaultValue;
        const value = parseFloat(element.value);
        return isNaN(value) ? defaultValue : value;
    }

    function createInputGroup(item, container, valueStore, isProLabore = false) {
        const group = document.createElement('div');
        group.classList.add('input-group');
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', `${item.id}Slider`);
        labelEl.textContent = item.label;
        const sliderEl = document.createElement('input');
        sliderEl.type = 'range';
        sliderEl.id = `${item.id}Slider`;
        sliderEl.min = item.min;
        sliderEl.max = item.max;
        sliderEl.step = item.step;
        sliderEl.value = item.defaultValue;
        const numberEl = document.createElement('input');
        numberEl.type = 'number';
        numberEl.id = `${item.id}Number`;
        numberEl.min = item.min;
        numberEl.max = item.max;
        numberEl.step = item.step;
        numberEl.value = item.defaultValue;
        if (!isProLabore && valueStore) {
            valueStore[item.id] = item.defaultValue;
        }
        group.appendChild(labelEl);
        group.appendChild(sliderEl);
        group.appendChild(numberEl);
        container.appendChild(group);

        sliderEl.addEventListener('input', () => {
            numberEl.value = sliderEl.value;
            if (!isProLabore && valueStore) {
                valueStore[item.id] = parseFloat(sliderEl.value);
            }
            updateAllCalculations();
        });
        
        const numberInputHandler = () => { // Handler comum para 'input' e 'change'
            let val = parseFloat(numberEl.value) || 0;
             if (val < parseFloat(sliderEl.min)) val = parseFloat(sliderEl.min);
             if (val > parseFloat(sliderEl.max)) val = parseFloat(sliderEl.max);
             numberEl.value = val; // Garante que o campo exiba o valor validado
             sliderEl.value = val; // Sincroniza slider
             if (!isProLabore && valueStore) {
                 valueStore[item.id] = val;
             }
             updateAllCalculations();
        };
        numberEl.addEventListener('input', () => { // Feedback rápido ao digitar
            sliderEl.value = numberEl.value; // Sincroniza slider
             if (!isProLabore && valueStore) {
                 valueStore[item.id] = parseFloat(numberEl.value); // Usa valor direto para gráfico
             }
            updateAllCalculations();
        });
        numberEl.addEventListener('change', numberInputHandler); // Validação final ao perder foco/enter
    }

    function populateOpExpenseItems() {
        opExpenseCategories.forEach(cat => {
            createInputGroup(cat, elements.expenseItemsContainer, currentOpExpenseValues, false);
        });
    }

    function populateProLaboreItems() {
        proLaborePartners.forEach(partner => {
            createInputGroup(partner, elements.proLaboreItemsContainer, null, true);
        });
    }
    
    function syncDistributionPartnerSliders(changedPartnerId) {
        const partnerIds = Object.keys(elements.distPartners);
        let totalPercent = 0;
        partnerIds.forEach(id => {
            totalPercent += parseFloatInput(elements.distPartners[id].percentNumber);
        });

        if (changedPartnerId && Math.abs(totalPercent - 100) > 0.01) {
            const changedValue = parseFloatInput(elements.distPartners[changedPartnerId].percentNumber);
            let remainingToDistribute = 100 - changedValue;
            const otherPartners = partnerIds.filter(id => id !== changedPartnerId);
            
            let sumOfOthersOld = 0;
            otherPartners.forEach(id => {
                sumOfOthersOld += parseFloatInput(elements.distPartners[id].percentNumber_old || elements.distPartners[id].percentNumber);
            });

            if (otherPartners.length > 0) {
                if (sumOfOthersOld < 0.01 && remainingToDistribute >= 0) {
                    const equalShare = remainingToDistribute / otherPartners.length;
                    otherPartners.forEach(id => {
                        const partner = elements.distPartners[id];
                        const newPercent = Math.max(0, Math.min(100, equalShare));
                        partner.percentSlider.value = newPercent.toFixed(1);
                        partner.percentNumber.value = newPercent.toFixed(1);
                    });
                } else if (sumOfOthersOld > 0.01) {
                    otherPartners.forEach(id => {
                        const partner = elements.distPartners[id];
                        const currentValOld = parseFloatInput(partner.percentNumber_old || partner.percentNumber);
                        let newPercent = (currentValOld / sumOfOthersOld) * remainingToDistribute;
                        newPercent = Math.max(0, Math.min(100, newPercent));
                        partner.percentSlider.value = newPercent.toFixed(1);
                        partner.percentNumber.value = newPercent.toFixed(1);
                    });
                } else if (remainingToDistribute < 0) { 
                     otherPartners.forEach(id => {
                        const partner = elements.distPartners[id];
                        partner.percentSlider.value = "0.0";
                        partner.percentNumber.value = "0.0";
                    });
                }
            }
        }
        
        totalPercent = 0;
        partnerIds.forEach(id => {
            totalPercent += parseFloatInput(elements.distPartners[id].percentNumber);
        });

        if (Math.abs(totalPercent - 100) > 0.15) {
            elements.partnerPercentSumAlert.style.display = 'block';
        } else {
            elements.partnerPercentSumAlert.style.display = 'none';
            if (partnerIds.length > 0 && Math.abs(totalPercent - 100) < 0.2 && Math.abs(totalPercent - 100) > 0.01) {
                 const adjustablePartner = partnerIds.find(id => {
                    const val = parseFloatInput(elements.distPartners[id].percentNumber);
                    return val > 0.05 && val < 99.95;
                 }) || partnerIds[partnerIds.length-1]; 

                 const partnerToAdjust = elements.distPartners[adjustablePartner];
                 let diff = 100 - totalPercent;
                 let finalVal = parseFloatInput(partnerToAdjust.percentNumber) + diff;
                 finalVal = Math.max(0, Math.min(100, finalVal));
                 partnerToAdjust.percentNumber.value = finalVal.toFixed(1);
                 partnerToAdjust.percentSlider.value = finalVal.toFixed(1);
            }
        }
        partnerIds.forEach(id => {
            elements.distPartners[id].percentNumber_old = parseFloatInput(elements.distPartners[id].percentNumber);
        });
    }

    function updateAllCalculations() {
        // 1. Receita Bruta
        const numPatients = parseFloatInput(elements.numPatientsNumber);
        const monthlyFee = parseFloatInput(elements.monthlyFeeSlider);
        const grossRevenue = numPatients * monthlyFee;
        elements.grossRevenueTotalDisplay.textContent = formatCurrency(grossRevenue);
        elements.resultGrossRevenue.textContent = formatCurrency(grossRevenue);

        // 2. Total de Custos e Despesas Operacionais
        let totalOpExpenses = 0;
        opExpenseCategories.forEach(cat => {
            const expenseInput = document.getElementById(`${cat.id}Number`);
            const expenseValue = parseFloatInput(expenseInput);
            totalOpExpenses += expenseValue;
            currentOpExpenseValues[cat.id] = expenseValue;
        });
        elements.totalOpExpensesDisplay.textContent = formatCurrency(totalOpExpenses);
        elements.resultTotalOpExpenses.textContent = formatCurrency(totalOpExpenses);

        // 3. Pró-Labore e Encargos
        let totalProLabore = 0;
        let totalProLaboreCharges = 0;
        proLaborePartners.forEach(partner => {
            const proLaboreInput = document.getElementById(`${partner.id}Number`);
            const proLaboreValue = parseFloatInput(proLaboreInput);
            totalProLabore += proLaboreValue;
            totalProLaboreCharges += proLaboreValue * PRO_LABORE_CHARGE_RATE;
        });
        elements.totalProLaboreDisplay.textContent = formatCurrency(totalProLabore);
        elements.totalProLaboreChargesDisplay.textContent = formatCurrency(totalProLaboreCharges);
        elements.resultTotalProLabore.textContent = formatCurrency(totalProLabore);
        elements.resultTotalProLaboreCharges.textContent = formatCurrency(totalProLaboreCharges);

        // 4. Impostos
        const salaryCLTInput = document.getElementById(`${SALARY_CLT_EXPENSE_ID}Number`);
        const salaryCLTExpenses = parseFloatInput(salaryCLTInput, 0);
        const taxRate = parseFloatInput(elements.taxRateNumber);
        const salaryPercentOfRevenue = grossRevenue > 0 ? (salaryCLTExpenses / grossRevenue) * 100 : 0;

        if (salaryPercentOfRevenue < 28 && grossRevenue > 0) {
            elements.taxAlert.style.display = 'block';
        } else {
            elements.taxAlert.style.display = 'none';
        }
        elements.taxRateDisplay.textContent = `${taxRate.toFixed(2)}%`;
        
        const totalTaxes = grossRevenue * (taxRate / 100);
        elements.totalTaxesDisplay.textContent = formatCurrency(totalTaxes);
        elements.resultTotalTaxes.textContent = formatCurrency(totalTaxes);

        // 5. Lucro Líquido
        const netProfit = grossRevenue - totalOpExpenses - totalProLabore - totalProLaboreCharges - totalTaxes;
        elements.netProfitLoss.textContent = formatCurrency(netProfit);
        elements.netProfitLoss.className = netProfit >= 0 ? 'profit' : 'loss';

        // --- 6. Distribuição do Lucro (LÓGICA ATUALIZADA) ---
        const adminFeePercent = parseFloatInput(elements.adminFeePercentNumber);
        elements.adminFeePercentDisplay.textContent = `${adminFeePercent.toFixed(1)}%`;
        
        const actualNetProfitForDistributionBase = Math.max(0, netProfit); 
        const adminFeeValue = actualNetProfitForDistributionBase * (adminFeePercent / 100);
        elements.adminFeeValueDisplay.textContent = formatCurrency(adminFeeValue);

        const profitAvailableForPartnersAndReserve = actualNetProfitForDistributionBase - adminFeeValue;
        elements.profitAvailableForPartnersAndReserveDisplay.textContent = formatCurrency(profitAvailableForPartnersAndReserve);

        const partnerDistributionPercent = parseFloatInput(elements.partnerDistributionPercentNumber);
        elements.partnerDistributionPercentDisplay.textContent = `${partnerDistributionPercent.toFixed(1)}%`;

        const totalEffectivelyDistributedToPartners = profitAvailableForPartnersAndReserve * (partnerDistributionPercent / 100);
        elements.totalEffectivelyDistributedToPartnersDisplay.textContent = formatCurrency(totalEffectivelyDistributedToPartners);

        Object.values(elements.distPartners).forEach(partnerControls => {
            const individualPartnerPercent = parseFloatInput(partnerControls.percentNumber); 
            partnerControls.percentDisplay.textContent = `${individualPartnerPercent.toFixed(1)}%`;
            // A distribuição individual agora é sobre o 'totalEffectivelyDistributedToPartners'
            const individualPartnerValue = totalEffectivelyDistributedToPartners * (individualPartnerPercent / 100);
            partnerControls.valueDisplay.textContent = formatCurrency(individualPartnerValue);
        });

        const cashReserve = profitAvailableForPartnersAndReserve - totalEffectivelyDistributedToPartners;
        elements.cashReserveDisplay.textContent = formatCurrency(cashReserve);
        // --- FIM DA LÓGICA ATUALIZADA DE DISTRIBUIÇÃO ---
        
        updateExpenseChart(currentOpExpenseValues, totalProLaboreCharges);
    }

    function initExpenseChart() {
        const expCtx = elements.expensesChartCanvas.getContext('2d');
        expensesChartInstance = new Chart(expCtx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    label: 'Composição das Despesas',
                    data: [],
                    backgroundColor: [
                        '#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#fd7e14',
                        '#6610f2', '#20c997', '#e83e8c', '#6f42c1', '#D2691E', '#4E9A06', '#A40000',
                        '#F57900', '#204A87', '#5C3566', '#75507B', '#C4A000', '#CE5C00'
                    ],
                    hoverOffset: 4,
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { padding: 15, boxWidth: 12, font: { size: 10 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) label += formatCurrency(context.parsed);
                                return label;
                            },
                            afterLabel: function(context) {
                                const total = context.chart.getDatasetMeta(0).total;
                                if (total === 0) return '(0%)';
                                const currentValue = context.parsed;
                                const percentage = ((currentValue / total) * 100).toFixed(1) + '%';
                                return `(${percentage})`;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateExpenseChart(opExpenseData, proLaboreChargesTotal) {
        if (!expensesChartInstance) return;
        const chartLabels = [];
        const chartData = [];
        opExpenseCategories.forEach(cat => {
            const value = opExpenseData[cat.id] || 0;
            if (value > 0.001) {
                chartLabels.push(cat.label.replace(' (R$)', ''));
                chartData.push(value);
            }
        });
        if (proLaboreChargesTotal > 0.001) {
            chartLabels.push('Encargos Pró-Labore');
            chartData.push(proLaboreChargesTotal);
        }
        if (chartData.length === 0) {
            expensesChartInstance.data.labels = ['Sem despesas para exibir'];
            expensesChartInstance.data.datasets[0].data = [1];
            expensesChartInstance.data.datasets[0].backgroundColor = ['#cccccc'];
        } else {
            expensesChartInstance.data.labels = chartLabels;
            expensesChartInstance.data.datasets[0].data = chartData;
             if(expensesChartInstance.data.datasets[0].backgroundColor[0] === '#cccccc') {
                expensesChartInstance.data.datasets[0].backgroundColor = [
                        '#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#fd7e14',
                        '#6610f2', '#20c997', '#e83e8c', '#6f42c1', '#D2691E', '#4E9A06', '#A40000',
                        '#F57900', '#204A87', '#5C3566', '#75507B', '#C4A000', '#CE5C00'
                    ];
             }
        }
        expensesChartInstance.update();
    }
    
    function exportToPdf() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const content = elements.simuladorContainer;
        elements.exportPdfButton.style.display = 'none';
        html2canvas(content, { scale: 1.8, useCORS: true, windowWidth: content.scrollWidth, windowHeight: content.scrollHeight }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const contentWidth = imgProps.width;
            const contentHeight = imgProps.height;
            const ratio = (pdfWidth - 20) / contentWidth;
            const newContentHeight = contentHeight * ratio;
            let position = 0;
            if (newContentHeight <= pdfHeight - 20) {
                pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, newContentHeight);
            } else {
                let remainingHeight = contentHeight;
                const canvasPageHeight = (pdfHeight - 20) / ratio;
                while(remainingHeight > 0) {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = contentWidth;
                    tempCanvas.height = Math.min(canvasPageHeight, remainingHeight);
                    const ctx = tempCanvas.getContext('2d');
                    ctx.drawImage(canvas, 0, position * canvasPageHeight, contentWidth, tempCanvas.height, 0, 0, contentWidth, tempCanvas.height);
                    const pageImgData = tempCanvas.toDataURL('image/png');
                    if (position > 0) pdf.addPage();
                    pdf.addImage(pageImgData, 'PNG', 10, 10, pdfWidth - 20, (tempCanvas.height * ratio));
                    remainingHeight -= canvasPageHeight;
                    position++;
                }
            }
            pdf.save('simulador_pnl_clinica.pdf');
            elements.exportPdfButton.style.display = 'block';
        }).catch(err => {
            console.error("Erro ao gerar PDF:", err);
            elements.exportPdfButton.style.display = 'block';
        });
    }

    // SEPARAÇÃO: Event listeners para elementos estáticos e os que são criados dinamicamente
    // Listeners para elementos criados dinamicamente estão em 'createInputGroup'

    function setupEventListenersForStaticElements() {
        // Receitas
        [elements.numPatientsSlider, elements.monthlyFeeSlider].forEach(slider => {
            const numberInputId = slider.id.replace('Slider', 'Number');
            const numberInput = document.getElementById(numberInputId);
            if (numberInput) {
                slider.addEventListener('input', () => { numberInput.value = slider.value; updateAllCalculations(); });
            }
        });
        [elements.numPatientsNumber, elements.monthlyFeeNumber].forEach(numberInput => {
            const sliderId = numberInput.id.replace('Number', 'Slider');
            const slider = document.getElementById(sliderId);
            if (slider) {
                const commonHandler = () => {
                    let val = parseFloat(numberInput.value) || 0;
                    if (val < parseFloat(slider.min)) val = parseFloat(slider.min);
                    if (val > parseFloat(slider.max)) val = parseFloat(slider.max);
                    numberInput.value = val; // Atualiza o campo com o valor clampado
                    slider.value = val; 
                    updateAllCalculations(); 
                };
                numberInput.addEventListener('input', () => { // Para feedback rapido
                    slider.value = numberInput.value; // Apenas sincroniza slider
                    updateAllCalculations();
                });
                numberInput.addEventListener('change', commonHandler); // Validação e clamp final
            }
        });

        // Impostos
        elements.taxRateSlider.addEventListener('input', () => {
            elements.taxRateNumber.value = parseFloat(elements.taxRateSlider.value).toFixed(2);
            updateAllCalculations();
        });
        const taxRateNumberHandler = () => {
            let val = parseFloat(elements.taxRateNumber.value) || 0;
            if (val < parseFloat(elements.taxRateSlider.min)) val = parseFloat(elements.taxRateSlider.min);
            if (val > parseFloat(elements.taxRateSlider.max)) val = parseFloat(elements.taxRateSlider.max);
            elements.taxRateNumber.value = val.toFixed(2);
            elements.taxRateSlider.value = val.toFixed(2);
            updateAllCalculations();
        };
        elements.taxRateNumber.addEventListener('input', () => {
             elements.taxRateSlider.value = elements.taxRateNumber.value;
             updateAllCalculations();
        });
        elements.taxRateNumber.addEventListener('change', taxRateNumberHandler);

        // Admin Fee
        elements.adminFeePercentSlider.addEventListener('input', () => {
            elements.adminFeePercentNumber.value = parseFloat(elements.adminFeePercentSlider.value).toFixed(1);
            updateAllCalculations();
        });
        const adminFeeNumberHandler = () => {
            let val = parseFloat(elements.adminFeePercentNumber.value) || 0;
            if (val < parseFloat(elements.adminFeePercentSlider.min)) val = parseFloat(elements.adminFeePercentSlider.min);
            if (val > parseFloat(elements.adminFeePercentSlider.max)) val = parseFloat(elements.adminFeePercentSlider.max);
            elements.adminFeePercentNumber.value = val.toFixed(1);
            elements.adminFeePercentSlider.value = val.toFixed(1);
            updateAllCalculations();
        };
        elements.adminFeePercentNumber.addEventListener('input', () => {
            elements.adminFeePercentSlider.value = elements.adminFeePercentNumber.value;
            updateAllCalculations();
        });
        elements.adminFeePercentNumber.addEventListener('change', adminFeeNumberHandler);

        // NOVO: Listener para o % de Distribuição AOS SÓCIOS (após lucro disponível)
        if(elements.partnerDistributionPercentSlider) { // Verifica se o elemento existe antes de adicionar listener
            elements.partnerDistributionPercentSlider.addEventListener('input', () => {
                elements.partnerDistributionPercentNumber.value = parseFloat(elements.partnerDistributionPercentSlider.value).toFixed(1);
                updateAllCalculations();
            });
        }
        if(elements.partnerDistributionPercentNumber) {
            const partnerDistPercentNumberHandler = () => {
                let val = parseFloat(elements.partnerDistributionPercentNumber.value) || 0;
                if (val < 0) val = 0; 
                if (val > 100) val = 100;
                elements.partnerDistributionPercentNumber.value = val.toFixed(1);
                elements.partnerDistributionPercentSlider.value = val.toFixed(1);
                updateAllCalculations();
            };
            elements.partnerDistributionPercentNumber.addEventListener('input', () => {
                if(elements.partnerDistributionPercentSlider) elements.partnerDistributionPercentSlider.value = elements.partnerDistributionPercentNumber.value;
                updateAllCalculations();
            });
            elements.partnerDistributionPercentNumber.addEventListener('change', partnerDistPercentNumberHandler);
        }
        
        // Distribuição Individual Sócios (sobre o valor efetivamente distribuído)
        Object.values(elements.distPartners).forEach(partnerControls => {
            if(partnerControls.percentSlider && partnerControls.percentNumber) { // Verifica se existem
                partnerControls.percentSlider.addEventListener('input', () => {
                    partnerControls.percentNumber.value = parseFloat(partnerControls.percentSlider.value).toFixed(1);
                    syncDistributionPartnerSliders(partnerControls.id);
                    updateAllCalculations();
                });
                const distPartnerNumberHandler = () => {
                    let val = parseFloat(partnerControls.percentNumber.value) || 0;
                    if (val < 0) val = 0;
                    if (val > 100) val = 100;
                    partnerControls.percentNumber.value = val.toFixed(1);
                    partnerControls.percentSlider.value = val.toFixed(1);
                    syncDistributionPartnerSliders(partnerControls.id);
                    updateAllCalculations();
                };
                partnerControls.percentNumber.addEventListener('input', () => {
                    partnerControls.percentSlider.value = partnerControls.percentNumber.value;
                    syncDistributionPartnerSliders(partnerControls.id);
                    updateAllCalculations();
                });
                partnerControls.percentNumber.addEventListener('change', distPartnerNumberHandler);
            }
        });

        if(elements.exportPdfButton) elements.exportPdfButton.addEventListener('click', exportToPdf);
    }

    function initializeSimulator() {
        populateOpExpenseItems(); // Cria Desp. Op. e seus listeners internos
        populateProLaboreItems(); // Cria Pró-Labore e seus listeners internos
        setupEventListenersForStaticElements(); // Adiciona listeners para Receita, Impostos, Admin Fee, % Distribuição, Distribuição Individual
        
        initExpenseChart();
        syncDistributionPartnerSliders(null); // Garante que a soma inicial dos sócios (distribuição) esteja correta
        updateAllCalculations(); // Calcula e exibe os valores iniciais
    }

    initializeSimulator();
});