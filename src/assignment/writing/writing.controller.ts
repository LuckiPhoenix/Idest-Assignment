import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WritingService } from './writing.service';
import { CreateWritingAssignmentDto } from './dto/create-writing-assignment.dto';
import { UpdateWritingAssignmentDto } from './dto/update-writing-assignment.dto';
import { CreateWritingSubmissionDto } from './dto/create-writing-submission.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('writing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Post('assignments')
  @ApiOperation({ summary: 'Create writing assignment' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() dto: CreateWritingAssignmentDto) {
    const data = await this.writingService.createAssignment(dto);
    return { status: true, message: 'Created', data, statusCode: HttpStatus.CREATED };
  }

  @Get('assignments')
  @ApiOperation({ summary: 'List writing assignments' })
  @ApiResponse({ status: HttpStatus.OK })
  async findAll() {
    const data = await this.writingService.findAll();
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('assignments/:id')
  @ApiOperation({ summary: 'Get writing assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async findOne(@Param('id') id: string) {
    const data = await this.writingService.findOne(id);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Patch('assignments/:id')
  @ApiOperation({ summary: 'Update writing assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async update(@Param('id') id: string, @Body() dto: UpdateWritingAssignmentDto) {
    const data = await this.writingService.update(id, dto);
    return { status: true, message: 'Updated', data, statusCode: HttpStatus.OK };
  }

  @Delete('assignments/:id')
  @ApiOperation({ summary: 'Delete writing assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async remove(@Param('id') id: string) {
    const data = await this.writingService.remove(id);
    return { status: true, message: 'Deleted', data, statusCode: HttpStatus.OK };
  }

  @Post('submissions')
  @ApiOperation({ summary: 'Submit writing essay' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async submitEssay(@Body() dto: CreateWritingSubmissionDto) {
    const data = await this.writingService.submitEssay(dto);
    return { status: true, message: 'Submitted', data, statusCode: HttpStatus.CREATED };
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Get all writing submissions' })
  @ApiResponse({ status: HttpStatus.OK })
  async getAllSubmissions() {
    const data = await this.writingService.getAllSubmissions();
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/user/:userId')
  @ApiOperation({ summary: 'Get user writing submissions' })
  @ApiResponse({ status: HttpStatus.OK })
  async getUserSubmissions(@Param('userId') userId: string) {
    const data = await this.writingService.getUserSubmissions(userId);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/assignment/:assignmentId')
  @ApiOperation({ summary: 'Get all submissions for a writing assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async getAssignmentSubmissions(@Param('assignmentId') assignmentId: string) {
    const data = await this.writingService.getAssignmentSubmissions(assignmentId);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/:id')
  @ApiOperation({ summary: 'Get writing submission' })
  @ApiResponse({ status: HttpStatus.OK })
  async getSubmission(@Param('id') id: string) {
    const data = await this.writingService.getSubmission(id);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }
}


