package usach.cl.gamat.entities;

import java.io.ByteArrayOutputStream;
import java.io.File;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;




public class ExcelUtils {

//	private static final Logger LOGGER = Logger.getLogger("mx.com.hash.newexcel.ExcelOOXML");
	public static byte[] generateExcel(Request request) throws IOException {

		Workbook workbook = new XSSFWorkbook();
		Sheet pagina = workbook.createSheet("Request");
				   
        XSSFFont defaultFont= (XSSFFont) workbook.createFont();
        defaultFont.setFontHeightInPoints((short)10);
        defaultFont.setFontName("Arial");
        defaultFont.setColor(IndexedColors.BLACK.getIndex());
        defaultFont.setBold(false);
        defaultFont.setItalic(false);

        XSSFFont font= (XSSFFont) workbook.createFont();
        font.setFontHeightInPoints((short)10);
        font.setFontName("Arial");
//        font.setColor(IndexedColors.WHITE.getIndex());
        font.setBold(true);
        font.setItalic(false);
	    
        CellStyle styleHeader = workbook.createCellStyle();
        CellStyle styleTableHeader = workbook.createCellStyle();
        CellStyle styleBody = workbook.createCellStyle();
        
        styleHeader.setFont(font);
        // Indicamos que tendra un fondo azul aqua
        // con patron solido del color indicado
        styleTableHeader.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
        styleTableHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        style.setAlignment();
        styleTableHeader.setFont(font);
        styleTableHeader.setBorderBottom(BorderStyle.HAIR);
        styleTableHeader.setBorderTop(BorderStyle.HAIR);
        styleTableHeader.setBorderRight(BorderStyle.HAIR);
        styleTableHeader.setBorderLeft(BorderStyle.HAIR);
        
        styleBody.setBorderBottom(BorderStyle.HAIR);
        styleBody.setBorderTop(BorderStyle.HAIR);
        styleBody.setBorderRight(BorderStyle.HAIR);
        styleBody.setBorderLeft(BorderStyle.HAIR);


	 
	    Row fila = pagina.createRow(0);
	    Cell celda = fila.createCell(0);
	    celda.setCellValue("Detalles Solicitud");
	    celda.setCellStyle(styleHeader);
	    
	    
	    fila = pagina.createRow(1);
	    celda=fila.createCell(0);
	    celda.setCellValue("Solicitante:");
	    celda.setCellStyle(styleHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue(request.getManager().getName());
	    celda.setCellStyle(styleHeader);
	    
	    fila = pagina.createRow(2);
	    celda=fila.createCell(0);
	    celda.setCellValue("Compañía:");
	    celda.setCellStyle(styleHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue(request.getBuilding().getCompany().getName());
	    celda.setCellStyle(styleHeader);
	    
	    fila = pagina.createRow(3);
	    celda=fila.createCell(0);
	    celda.setCellValue("Direccion de Obra:");
	    celda.setCellStyle(styleHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue(request.getBuilding().getAddress());
	    celda.setCellStyle(styleHeader);
	    
	    fila = pagina.createRow(4);
	    celda=fila.createCell(0);
	    celda.setCellValue("Fecha de Solicitud:");
	    celda.setCellStyle(styleHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue(request.getDate());
	    celda.setCellStyle(styleHeader);
	    
	    
	    fila = pagina.createRow(4);
	    celda=fila.createCell(0);
	    celda.setCellValue("Estado de Solicitud:");
	    celda.setCellStyle(styleHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue(request.getState());
	    celda.setCellStyle(styleHeader);
	    
	    fila = pagina.createRow(6);
	    celda=fila.createCell(0);
	    celda.setCellValue("Items:");
	    celda.setCellStyle(styleHeader);
	    
	    fila = pagina.createRow(7);
	    celda=fila.createCell(0);
	    celda.setCellValue("Id");
	    celda.setCellStyle(styleTableHeader);
	    celda=fila.createCell(1);
	    celda.setCellValue("Nombre");
	    celda.setCellStyle(styleTableHeader);
	    celda=fila.createCell(2);
	    celda.setCellValue("Descripcion");
	    celda.setCellStyle(styleTableHeader);
	    celda=fila.createCell(3);
	    celda.setCellValue("Unidad");
	    celda.setCellStyle(styleTableHeader);
	    celda=fila.createCell(4);
	    celda.setCellValue("Cantidad");
	    celda.setCellStyle(styleTableHeader);
	    celda=fila.createCell(5);
	    celda.setCellValue("Precio");
	    celda.setCellStyle(styleTableHeader);
	    
	    int i=8;
	    int y=1;
	    for (Item item: request.getItems()) {
	    	
	    	fila = pagina.createRow(i);
            // Creamos una celda en esa fila, en la
            // posicion indicada por el contador del ciclo
	    	celda=fila.createCell(0);
	    	celda.setCellValue(Integer.toString(item.getIdItem()));
	    	 celda.setCellStyle(styleBody);
	    	 
        	 celda=fila.createCell(1);
        	 celda.setCellValue(item.getName());
        	 celda.setCellStyle(styleBody);
        	 
             celda=fila.createCell(2);
             celda.setCellValue(item.getDescription());
             celda.setCellStyle(styleBody);
             
             celda=fila.createCell(3);
             celda.setCellValue(item.getMeasure());
             celda.setCellStyle(styleBody);
             
             celda=fila.createCell(4);
             celda.setCellValue(item.getQuantity());
             celda.setCellStyle(styleBody);
             
             celda=fila.createCell(5);
//             celda.setCellValue(item.getQuantity());
             celda.setCellStyle(styleBody);
	 
	 	    i++;
		}

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            // Almacenamos el libro de 
            // Excel via ese 
            // flujo de datos
            System.out.println("aa1");
            workbook.write(out);
            System.out.println("aa1");

            // Cerramos el libro para concluir operaciones
            workbook.close();

//            LOGGER.log(Level.INFO, "Archivo creado existosamente en {0}", archivo.getAbsolutePath());
            return out.toByteArray();

       
	
	}
}
