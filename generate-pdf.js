const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('🚀 Starting PDF generation for ElectroPanel Pro Documentation...');
    
    try {
        // Launch browser
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set viewport for consistent rendering
        await page.setViewport({ width: 1200, height: 800 });
        
        // Get the HTML file path
        const htmlFilePath = path.join(__dirname, 'PROJECT_DOCUMENTATION.html');
        
        // Check if file exists
        if (!fs.existsSync(htmlFilePath)) {
            throw new Error('PROJECT_DOCUMENTATION.html not found!');
        }
        
        // Load the HTML file
        await page.goto(`file://${htmlFilePath}`, { 
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        console.log('📄 HTML file loaded successfully...');
        
        // Wait for any dynamic content to load
        await page.waitForTimeout(2000);
        
        // Generate PDF with optimized settings
        const pdfBuffer = await page.pdf({
            path: 'ElectroPanel_Pro_Documentation.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            },
            preferCSSPageSize: true,
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size: 10px; padding: 5px 15mm; width: 100%; text-align: center; color: #64748B;">
                    ElectroPanel Pro - Technical Documentation
                </div>
            `,
            footerTemplate: `
                <div style="font-size: 9px; padding: 5px 15mm; width: 100%; text-align: center; color: #64748B;">
                    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                    <span style="float: right;">Generated on ${new Date().toLocaleDateString()}</span>
                </div>
            `
        });
        
        await browser.close();
        
        console.log('✅ PDF generated successfully!');
        console.log('📁 File saved as: ElectroPanel_Pro_Documentation.pdf');
        console.log(`📊 File size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error.message);
        process.exit(1);
    }
}

// Check if puppeteer is installed
try {
    require.resolve('puppeteer');
    generatePDF();
} catch (e) {
    console.log('⚠️  Puppeteer is not installed.');
    console.log('📦 To install and generate PDF, run:');
    console.log('   npm install puppeteer');
    console.log('   node generate-pdf.js');
    console.log('');
    console.log('💡 Alternative: Use the PDF_Converter.html file for browser-based conversion');
}