// VERSÃO COMPLETA E CORRIGIDA (SEU ARQUIVO)
document.addEventListener('DOMContentLoaded', function () {
    // --- Referências Globais de Elementos ---
    const elements = {
        // Seção 1: Receitas por Paciente (NOVO)
        patientRevenueItemsContainer: document.getElementById('patient-revenue-items-container'),
        totalClinicGrossRevenue: document.getElementById('totalClinicGrossRevenue'), // Display do total da receita da clínica

        // Seção 2: Custos e Despesas Op.
        expenseItemsContainer: document.getElementById('expense-items-container'),
        totalOpExpensesDisplay: document.getElementById('totalOpExpensesDisplay'),

        // Seção 3: Pró-Labore
        proLaboreItemsContainer: document.getElementById('prolabore-items-container'),
        totalProLaboreDisplay: document.getElementById('totalProLaboreDisplay'),
        totalProLaboreChargesDisplay: document.getElementById('totalProLaboreChargesDisplay'),

        // Seção 4: Impostos
        taxRateSlider: document.getElementById('taxRateSlider'),
        taxRateNumber: document.getElementById('taxRateNumber'),
        taxRateDisplay: document.getElementById('taxRateDisplay'),
        taxAlert: document.getElementById('taxAlert'),
        totalTaxesDisplay: document.getElementById('totalTaxesDisplay'),

        // Seção 5: PNL
        resultClinicGrossRevenue: document.getElementById('resultClinicGrossRevenue'), // Display no PNL
        resultTotalOpExpenses: document.getElementById('resultTotalOpExpenses'),
        resultTotalProLabore: document.getElementById('resultTotalProLabore'),
        resultTotalProLaboreCharges: document.getElementById('resultTotalProLaboreCharges'),
        resultTotalTaxes: document.getElementById('resultTotalTaxes'),
        netProfitLoss: document.getElementById('netProfitLoss'),

        // Seção 6: Distribuição Lucro
        adminFeePercentSlider: document.getElementById('adminFeePercentSlider'),
        adminFeePercentNumber: document.getElementById('adminFeePercentNumber'),
        adminFeePercentDisplay: document.getElementById('adminFeePercentDisplay'),
        adminFeeValueDisplay: document.getElementById('adminFeeValueDisplay'),
        
        // Campos para a lógica de Reserva de Caixa (REINTEGRADOS da sua sugestão)
        profitAvailableForPartnersAndReserveDisplay: document.getElementById('profitAvailableForPartnersAndReserveDisplay'), 
        partnerDistributionPercentSlider: document.getElementById('partnerDistributionPercentSlider'),
        partnerDistributionPercentNumber: document.getElementById('partnerDistributionPercentNumber'),
        partnerDistributionPercentDisplay: document.getElementById('partnerDistributionPercentDisplay'),
        totalEffectivelyDistributedToPartnersDisplay: document.getElementById('totalEffectivelyDistributedToPartnersDisplay'),
        cashReserveDisplay: document.getElementById('cashReserveDisplay'),
        //---//
        profitDistributableToPartnersDisplay: document.getElementById('profitDistributableToPartnersDisplay'), 


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
        
        exportPdfButton: document.getElementById('exportPdfButton'),
        simuladorContainer: document.getElementById('simuladorContainer'),
        expensesChartCanvas: document.getElementById('expensesChart')
    };

    const MAX_PATIENTS = 25;
    const SALARY_CLT_EXPENSE_ID = 'salariosEncargosCLT'; 

    const opExpenseCategories = [
        { id: 'aluguelCondominio', label: 'Aluguel e Condomínio (R$)', min: 0, max: 30000, step: 100, defaultValue: 8000 },
        { id: 'iptuAguaEnergiaTelefoniaInternet', label: 'IPTU, Água, Energia, Telefonia e Internet (R$)', min: 0, max: 8000, step: 100, defaultValue: 2500 },
        { id: 'softwaresLicencas', label: 'Softwares e Licenças (R$)', min: 0, max: 2000, step: 50, defaultValue: 250 },
        { id: SALARY_CLT_EXPENSE_ID, label: 'Salários CLT (base + encargos) (R$)', min: 0, max: 150000, step: 1000, defaultValue: 40000 },
        { id: 'contabilidadeJuridico', label: 'Serviços de Contabilidade e Jurídicos (R$)', min: 0, max: 6000, step: 100, defaultValue: 1100 },
        { id: 'marketingPublicidade', label: 'Marketing e Publicidade (R$)', min: 0, max: 10000, step: 100, defaultValue: 1000 },
        { id: 'materiaisLimpezaEscritorioHigiene', label: 'Materiais (Limpeza, Escritório e Higiene) (R$)', min: 0, max: 5000, step: 100, defaultValue: 2000 },
        { id: 'enxovalEquipamentos', label: 'Enxoval e Equipamentos (R$)', min: 0, max: 10000, step: 100, defaultValue: 1500 },
        { id: 'materialHospitalar', label: 'Material Hospitalar (R$)', min: 0, max: 15000, step: 100, defaultValue: 3000 },
        { id: 'alimentacaoInsumos', label: 'Alimentação e Insumos (R$)', min: 0, max: 30000, step: 200, defaultValue: 12000 },
        { id: 'medicamentosClinica', label: 'Medicamentos (Clínica) (R$)', min: 0, max: 10000, step: 100, defaultValue: 2500 },
        { id: 'manutencaoPredialEquip', label: 'Manutenção Predial e Equipamentos (R$)', min: 0, max: 5000, step: 100, defaultValue: 700 },
        { id: 'uniformesVeiculos', label: 'Uniformes e Veículos (R$)', min: 0, max: 4000, step: 100, defaultValue: 500 },
        { id: 'despesasBancarias', label: 'Despesas Bancárias (R$)', min: 0, max: 500, step: 10, defaultValue: 100 },
        { id: 'outrasDespesasDiversas', label: 'Outras Despesas Diversas (R$)', min: 0, max: 5000, step: 50, defaultValue: 500 },
    ];
    let currentOpExpenseValues = {};

    const proLaborePartners = [
        { id: 'danielaProLabore', label: 'Pró-Labore Daniela (R$)', min: 0, max: 20000, step: 100, defaultValue: 9002 },
        { id: 'mariaLuciaProLabore', label: 'Pró-Labore Maria Lucia (R$)', min: 0, max: 20000, step: 100, defaultValue: 4800 },
        { id: 'nandoProLabore', label: 'Pró-Labore Nando (R$)', min: 0, max: 20000, step: 100, defaultValue: 4800 }
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

    function createGenericInputGroup(itemConfig, container, valueStoreObject, isProLabore = false) {
        const group = document.createElement('div');
        group.classList.add('input-group');
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', `${itemConfig.id}Slider`);
        labelEl.textContent = itemConfig.label;
        const sliderEl = document.createElement('input');
        sliderEl.type = 'range';
        sliderEl.id = `${itemConfig.id}Slider`;
        sliderEl.min = itemConfig.min;
        sliderEl.max = itemConfig.max;
        sliderEl.step = itemConfig.step;
        sliderEl.value = itemConfig.defaultValue;
        const numberEl = document.createElement('input');
        numberEl.type = 'number';
        numberEl.id = `${itemConfig.id}Number`;
        numberEl.min = itemConfig.min;
        numberEl.max = itemConfig.max;
        numberEl.step = itemConfig.step;
        numberEl.value = itemConfig.defaultValue;
        
        if (!isProLabore && valueStoreObject) {
            valueStoreObject[itemConfig.id] = itemConfig.defaultValue;
        }

        group.appendChild(labelEl);
        group.appendChild(sliderEl);
        group.appendChild(numberEl);
        container.appendChild(group);

        sliderEl.addEventListener('input', () => {
            numberEl.value = sliderEl.value;
            if (!isProLabore && valueStoreObject) {
                valueStoreObject[itemConfig.id] = parseFloat(sliderEl.value);
            }
            updateAllCalculations();
        });
        
        const numberInputHandler = () => {
            let val = parseFloat(numberEl.value) || 0;
             if (val < parseFloat(sliderEl.min)) val = parseFloat(sliderEl.min);
             if (val > parseFloat(sliderEl.max)) val = parseFloat(sliderEl.max);
             numberEl.value = val; 
             sliderEl.value = val; 
             if (!isProLabore && valueStoreObject) {
                 valueStoreObject[itemConfig.id] = val;
             }
             updateAllCalculations();
        };
        numberEl.addEventListener('input', () => { 
            sliderEl.value = numberEl.value; 
             if (!isProLabore && valueStoreObject) {
                 valueStoreObject[itemConfig.id] = parseFloat(numberEl.value); 
             }
            updateAllCalculations();
        });
        numberEl.addEventListener('change', numberInputHandler); 
    }

    function populateOpExpenseItems() {
        if(!elements.expenseItemsContainer) return;
        opExpenseCategories.forEach(cat => {
            createGenericInputGroup(cat, elements.expenseItemsContainer, currentOpExpenseValues, false);
        });
    }

    function populateProLaboreItems() {
        if(!elements.proLaboreItemsContainer) return;
        proLaborePartners.forEach(partner => {
            createGenericInputGroup(partner, elements.proLaboreItemsContainer, null, true);
        });
    }

    function populatePatientRevenueItems() {
        const container = elements.patientRevenueItemsContainer;
        if (!container) return; 

        for (let i = 1; i <= MAX_PATIENTS; i++) {
            const patientRow = document.createElement('div');
            patientRow.classList.add('patient-row');
            patientRow.dataset.patientId = i;

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.classList.add('patient-name-input');
            nameInput.id = `patientName${i}`;
            nameInput.value = `Paciente ${i}`;
            nameInput.placeholder = `Nome Paciente ${i}`;

            const monthlyFeeGroup = createPatientInputField(i, 'Mensalidade', 'monthlyFee', 1000, 20000, 100, (i <= 5 ? 5000 : 0) );
            const extraRevenueGroup = createPatientInputField(i, 'Receita Extra', 'extraRevenue', 0, 5000, 50, (i <=3 ? 200: 0) );

            const totalDisplay = document.createElement('div');
            totalDisplay.classList.add('patient-total-display');
            totalDisplay.id = `patientTotal${i}`;
            totalDisplay.innerHTML = `Total: <span>R$ 0,00</span>`;

            patientRow.appendChild(nameInput);
            patientRow.appendChild(monthlyFeeGroup);
            patientRow.appendChild(extraRevenueGroup);
            patientRow.appendChild(totalDisplay);
            container.appendChild(patientRow);
        }
    }

    function createPatientInputField(patientId, labelText, fieldType, min, max, step, defaultValue) {
        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group'); 

        const label = document.createElement('label');
        label.setAttribute('for', `${fieldType}${patientId}Slider`);
        label.textContent = `${labelText}:`;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.id = `${fieldType}${patientId}Slider`;
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = defaultValue;
        
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `${fieldType}${patientId}Number`;
        numberInput.min = min;
        numberInput.max = max;
        numberInput.step = step;
        numberInput.value = defaultValue;

        slider.addEventListener('input', () => {
            numberInput.value = slider.value;
            updateAllCalculations();
        });
        
        const numberChangeHandler = () => {
            let val = parseFloat(numberInput.value) || 0;
            if (val < min) val = min;
            if (val > max) val = max;
            numberInput.value = val; 
            slider.value = val;     
            updateAllCalculations();
        };

        numberInput.addEventListener('input', () => { 
             slider.value = numberInput.value; 
             updateAllCalculations(); 
        });
        numberInput.addEventListener('change', numberChangeHandler); 

        inputGroupDiv.appendChild(label);
        inputGroupDiv.appendChild(slider);
        inputGroupDiv.appendChild(numberInput);
        return inputGroupDiv;
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
        // 1. Receita Bruta da Clínica
        let totalClinicGrossRevenue = 0;
        for (let i = 1; i <= MAX_PATIENTS; i++) {
            const monthlyFeeEl = document.getElementById(`monthlyFee${i}Number`);
            const extraRevenueEl = document.getElementById(`extraRevenue${i}Number`);
            const patientTotalDisplaySpan = document.querySelector(`#patientTotal${i} span`);

            if (monthlyFeeEl && extraRevenueEl) {
                const monthlyFee = parseFloatInput(monthlyFeeEl);
                const extraRevenue = parseFloatInput(extraRevenueEl);
                const patientTotalRevenue = monthlyFee + extraRevenue;
                
                if (patientTotalDisplaySpan) patientTotalDisplaySpan.textContent = formatCurrency(patientTotalRevenue);
                totalClinicGrossRevenue += patientTotalRevenue;
            }
        }
        if (elements.totalClinicGrossRevenue) elements.totalClinicGrossRevenue.textContent = formatCurrency(totalClinicGrossRevenue);
        if (elements.resultClinicGrossRevenue) elements.resultClinicGrossRevenue.textContent = formatCurrency(totalClinicGrossRevenue);

        // 2. Total de Custos e Despesas Operacionais
        let totalOpExpenses = 0;
        opExpenseCategories.forEach(cat => {
            const expenseInput = document.getElementById(`${cat.id}Number`);
            const expenseValue = parseFloatInput(expenseInput);
            totalOpExpenses += expenseValue;
            if (currentOpExpenseValues.hasOwnProperty(cat.id)) { 
                currentOpExpenseValues[cat.id] = expenseValue;
            }
        });
        if(elements.totalOpExpensesDisplay) elements.totalOpExpensesDisplay.textContent = formatCurrency(totalOpExpenses);
        if(elements.resultTotalOpExpenses) elements.resultTotalOpExpenses.textContent = formatCurrency(totalOpExpenses);

        // 3. Pró-Labore e Encargos
        let totalProLabore = 0;
        let totalProLaboreCharges = 0;
        proLaborePartners.forEach(partner => {
            const proLaboreInput = document.getElementById(`${partner.id}Number`);
            const proLaboreValue = parseFloatInput(proLaboreInput);
            totalProLabore += proLaboreValue;
            totalProLaboreCharges += proLaboreValue * PRO_LABORE_CHARGE_RATE;
        });
        if(elements.totalProLaboreDisplay) elements.totalProLaboreDisplay.textContent = formatCurrency(totalProLabore);
        if(elements.totalProLaboreChargesDisplay) elements.totalProLaboreChargesDisplay.textContent = formatCurrency(totalProLaboreCharges);
        if(elements.resultTotalProLabore) elements.resultTotalProLabore.textContent = formatCurrency(totalProLabore);
        if(elements.resultTotalProLaboreCharges) elements.resultTotalProLaboreCharges.textContent = formatCurrency(totalProLaboreCharges);

        // 4. Impostos
        const salaryCLTInput = document.getElementById(`${SALARY_CLT_EXPENSE_ID}Number`);
        const salaryCLTExpenses = parseFloatInput(salaryCLTInput, 0);
        const taxRate = parseFloatInput(elements.taxRateNumber);
        const salaryPercentOfRevenue = totalClinicGrossRevenue > 0 ? (salaryCLTExpenses / totalClinicGrossRevenue) * 100 : 0;

        if (elements.taxAlert) {
            elements.taxAlert.style.display = (salaryPercentOfRevenue < 28 && totalClinicGrossRevenue > 0) ? 'block' : 'none';
        }
        if (elements.taxRateDisplay) elements.taxRateDisplay.textContent = `${taxRate.toFixed(2)}%`;
        
        const totalTaxes = totalClinicGrossRevenue * (taxRate / 100);
        if (elements.totalTaxesDisplay) elements.totalTaxesDisplay.textContent = formatCurrency(totalTaxes);
        if (elements.resultTotalTaxes) elements.resultTotalTaxes.textContent = formatCurrency(totalTaxes);

        // 5. Lucro Líquido Final
        const netProfit = totalClinicGrossRevenue - totalOpExpenses - totalProLabore - totalProLaboreCharges - totalTaxes;
        if (elements.netProfitLoss) {
            elements.netProfitLoss.textContent = formatCurrency(netProfit);
            elements.netProfitLoss.className = netProfit >= 0 ? 'profit' : 'loss';
        }
        
        // 6. Distribuição do Lucro Líquido Final
        const adminFeePercent = parseFloatInput(elements.adminFeePercentNumber);
        if(elements.adminFeePercentDisplay) elements.adminFeePercentDisplay.textContent = `${adminFeePercent.toFixed(1)}%`;
        
        const actualNetProfitForDistributionBase = Math.max(0, netProfit); 
        const adminFeeValue = actualNetProfitForDistributionBase * (adminFeePercent / 100);
        if(elements.adminFeeValueDisplay) elements.adminFeeValueDisplay.textContent = formatCurrency(adminFeeValue);

        const profitAfterAdminFee = actualNetProfitForDistributionBase - adminFeeValue;

        let totalEffectivelyDistributedToPartners = 0;
        let cashReserve = 0;

        // Se os elementos para controle de reserva existem, usa-os
        if (elements.partnerDistributionPercentNumber && elements.cashReserveDisplay && elements.totalEffectivelyDistributedToPartnersDisplay && elements.profitAvailableForPartnersAndReserveDisplay) {
            const partnerPayoutPercent = parseFloatInput(elements.partnerDistributionPercentNumber);
            if(elements.partnerDistributionPercentDisplay) elements.partnerDistributionPercentDisplay.textContent = `${partnerPayoutPercent.toFixed(1)}%`;
            
            totalEffectivelyDistributedToPartners = profitAfterAdminFee * (partnerPayoutPercent / 100);
            cashReserve = profitAfterAdminFee - totalEffectivelyDistributedToPartners;

            elements.totalEffectivelyDistributedToPartnersDisplay.textContent = formatCurrency(totalEffectivelyDistributedToPartners);
            elements.cashReserveDisplay.textContent = formatCurrency(cashReserve);
            elements.profitAvailableForPartnersAndReserveDisplay.textContent = formatCurrency(profitAfterAdminFee);
             // Atualiza o display que mostra o valor que vai para divisão dos sócios (era profitDistributableToPartnersDisplay)
             // Considerando que este é o valor efetivo que será dividido pelos sócios (Nando, Maria, Daniela)
            if(elements.profitDistributableToPartnersDisplay) elements.profitDistributableToPartnersDisplay.textContent = formatCurrency(totalEffectivelyDistributedToPartners);


        } else { 
            totalEffectivelyDistributedToPartners = profitAfterAdminFee; 
             if(elements.profitDistributableToPartnersDisplay) elements.profitDistributableToPartnersDisplay.textContent = formatCurrency(totalEffectivelyDistributedToPartners);
        }


        Object.values(elements.distPartners).forEach(partnerControls => {
            const individualPartnerPercent = parseFloatInput(partnerControls.percentNumber); 
            if(partnerControls.percentDisplay) partnerControls.percentDisplay.textContent = `${individualPartnerPercent.toFixed(1)}%`;
            const individualPartnerValue = totalEffectivelyDistributedToPartners * (individualPartnerPercent / 100);
            if(partnerControls.valueDisplay) partnerControls.valueDisplay.textContent = formatCurrency(individualPartnerValue);
        });
        
        updateExpenseChart(currentOpExpenseValues, totalProLaboreCharges);
    }

    function initExpenseChart() {
        if (!elements.expensesChartCanvas) return;
        const expCtx = elements.expensesChartCanvas.getContext('2d');
        expensesChartInstance = new Chart(expCtx, {
            type: 'pie',
            data: { labels: [], datasets: [{ label: 'Composição das Despesas', data: [], backgroundColor: ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#fd7e14','#6610f2', '#20c997', '#e83e8c', '#6f42c1', '#D2691E', '#4E9A06', '#A40000','#F57900', '#204A87', '#5C3566', '#75507B', '#C4A000', '#CE5C00'], hoverOffset: 4, borderColor: '#fff', borderWidth: 1 }] }, 
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { padding: 15, boxWidth: 12, font: { size: 10 } } }, tooltip: { callbacks: { label: function(context) { let label = context.label || ''; if (label) label += ': '; if (context.parsed !== null) label += formatCurrency(context.parsed); return label; }, afterLabel: function(context) { const total = context.chart.getDatasetMeta(0).total; if (total === 0) return '(0%)'; const currentValue = context.parsed; const percentage = ((currentValue / total) * 100).toFixed(1) + '%'; return `(${percentage})`; } } } } }
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
                expensesChartInstance.data.datasets[0].backgroundColor = ['#007bff', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#fd7e14','#6610f2', '#20c997', '#e83e8c', '#6f42c1', '#D2691E', '#4E9A06', '#A40000','#F57900', '#204A87', '#5C3566', '#75507B', '#C4A000', '#CE5C00'];
             }
        }
        expensesChartInstance.update();
     }
    
    function exportToPdf() { 
        if (!window.jspdf || !window.html2canvas) {
            alert("Erro: Bibliotecas jsPDF ou html2canvas não carregadas.");
            return;
        }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const content = elements.simuladorContainer;
        if(!content) { alert("Erro: Container do simulador não encontrado."); return;}
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
                while(remainingHeight > 0.1) { // Pequena tolerância para evitar loops infinitos por arredondamento
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = contentWidth;
                    // Calcula a altura da fatia, garantindo que não seja negativa ou zero se remainingHeight for pequeno
                    const sliceHeight = Math.max(0, Math.min(canvasPageHeight, remainingHeight));
                    if (sliceHeight < 1) break; // Evita criar canvas de altura zero
                    tempCanvas.height = sliceHeight;

                    const ctx = tempCanvas.getContext('2d');
                     // Calcula y-offset para o drawImage no canvas original
                    const sourceY = position * canvasPageHeight;
                    ctx.drawImage(canvas, 0, sourceY, contentWidth, sliceHeight, 0, 0, contentWidth, sliceHeight);
                    
                    const pageImgData = tempCanvas.toDataURL('image/png');
                    if (position > 0) pdf.addPage();
                    pdf.addImage(pageImgData, 'PNG', 10, 10, pdfWidth - 20, (sliceHeight * ratio));
                    
                    remainingHeight -= canvasPageHeight;
                    position++;
                }
            }
            pdf.save('simulador_pnl_clinica_detalhado.pdf');
            elements.exportPdfButton.style.display = 'block';
        }).catch(err => {
            console.error("Erro ao gerar PDF:", err);
            elements.exportPdfButton.style.display = 'block';
        });
     }

    function setupEventListenersForStaticElements() {
        // Impostos
        if(elements.taxRateSlider && elements.taxRateNumber){
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
        }

        // Admin Fee
        if(elements.adminFeePercentSlider && elements.adminFeePercentNumber){
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
        }
        
        // Listener para o % de Distribuição do lucro disponível AOS SÓCIOS (lógica da reserva)
        if(elements.partnerDistributionPercentSlider && elements.partnerDistributionPercentNumber) {
            elements.partnerDistributionPercentSlider.addEventListener('input', () => {
                elements.partnerDistributionPercentNumber.value = parseFloat(elements.partnerDistributionPercentSlider.value).toFixed(1);
                updateAllCalculations();
            });
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
        
        // Distribuição Individual dos Sócios
        Object.values(elements.distPartners).forEach(partnerControls => {
            if(partnerControls.percentSlider && partnerControls.percentNumber) {
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
        populatePatientRevenueItems();    
        populateOpExpenseItems();       
        populateProLaboreItems();     
        setupEventListenersForStaticElements(); 
        
        initExpenseChart();
        syncDistributionPartnerSliders(null);
        updateAllCalculations(); 
    }

    initializeSimulator();
});